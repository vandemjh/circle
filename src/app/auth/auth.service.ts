/**
 * Adapted from the Auth0 Example.
 */

import { Injectable } from '@angular/core';
import createAuth0Client, {
  Auth0ClientOptions,
  RedirectLoginResult,
  GetUserOptions,
} from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import {
  from,
  of,
  Observable,
  BehaviorSubject,
  combineLatest,
  throwError,
  ObservableInput,
  Subject,
  ReplaySubject,
} from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CircleService } from '../services/circle.service';
import { User } from '../models/user/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  config: Auth0ClientOptions;
  private static userReplaySubject: ReplaySubject<User> = new ReplaySubject<
    User
  >(1);

  // Create an observable of Auth0 instance of client, asynchronously pulls from secrets endpoint
  auth0Client: Observable<Auth0Client> = new Observable<Auth0Client>(
    (observer) => {
      this.service
        .getSecrets()
        .toPromise()
        .then((obj: Auth0ClientOptions) => (this.config = obj))
        .catch((err) => throwError(err))
        .then(() =>
          createAuth0Client(this.config)
            .then((client: Auth0Client) => {
              observer.next(client);
              client.getUser().then((uTemp: any) => {
                if (uTemp && !(uTemp instanceof User) && uTemp.sub)
                  this.service
                    .getUserBySub(uTemp.sub)
                    .subscribe((user: User) =>
                      AuthService.userReplaySubject.next(user)
                    );
              });
            })
            .catch((err) => throwError(err))
        );
    }
  ).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError((err) => throwError(err))
  );

  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated = this.auth0Client.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap((res) => (this.loggedIn = res))
  );
  handleRedirectCallback = this.auth0Client.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback())),
    catchError(
      (err, caught: Observable<RedirectLoginResult>): ObservableInput<any> => {
        caught.subscribe((err) => console.log(err));
        return of(err);
      }
    )
  );
  // Create subject and public observable of user profile data
  private userProfileSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  userProfile = this.userProfileSubject.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;

  constructor(private router: Router, private service: CircleService) {
    // On initial load, check authentication state with authorization server
    // Set up local auth streams if user is already authenticated
    this.localAuthSetup();
    // Handle redirect from Auth0 login
    this.handleAuthCallback();
  }

  /**
   * Returns the current token in memory.
   */
  getToken(): Observable<string> {
    return new Observable<string>((observer) =>
      this.auth0Client.subscribe((client) =>
        client.getTokenSilently().then((token) => observer.next(token))
      )
    );
  }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  private getUser(options?: GetUserOptions): Observable<any> {
    return this.auth0Client.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap((user) => this.userProfileSubject.next(user))
    );
  }

  private localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth = this.isAuthenticated.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    checkAuth.subscribe();
  }

  login(redirectPath: string = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect({
        redirect_uri: `${window.location.origin}`,
        appState: { target: redirectPath },
      });
    });
  }

  public static getLoggedInUser(): Observable<User> {
    return AuthService.userReplaySubject.asObservable();
  }

  private handleAuthCallback() {
    // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute: string; // Path to redirect to after login processsed
      const authComplete = this.handleRedirectCallback.pipe(
        // Have client, now call method to handle auth callback redirect
        tap((cbRes) => {
          // Login to backend
          // console.log('set logged in user here');
          this.getUser().subscribe((u) =>
            this.service
              .login(u)
              .subscribe((user: User) =>
                AuthService.userReplaySubject.next(user)
              )
          );
          // Get and set target redirect route from callback results
          targetRoute =
            cbRes.appState && cbRes.appState.target
              ? cbRes.appState.target
              : '/';
        }),
        concatMap(() => {
          // Redirect callback complete; get user and login status
          return combineLatest([this.getUser(), this.isAuthenticated]);
        })
      );
      // Subscribe to authentication completion observable
      // Response will be an array of user and login status
      authComplete.subscribe(([user, loggedIn]) => {
        // Redirect to target route after callback processing
        this.router.navigateByUrl(targetRoute);
      });
    }
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: this.config.CLIENT_ID,
        returnTo: window.location.origin,
      });
    });
  }
}
