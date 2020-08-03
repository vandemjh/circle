import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'
import * as OktaAuth from '@okta/okta-auth-js';

@Injectable()
export class OktaAuthService {
  // IMPORTANT!
  // Replace {clientId} with your actual Client ID
  // Replace {yourOktaDomain} with your actual Okta domain
  // If using a custom authorization server, ISSUER should be 'https://{yourOktaDomain}/oauth2/${authServerId}'

  CLIENT_ID = environment.CLIENT_ID;
  ISSUER = environment.ISSUER;
  LOGIN_REDIRECT_URI = environment.LOGIN_REDIRECT_URI;
  LOGOUT_REDIRECT_URI = environment.LOGOUT_REDIRECT_URI;
  SCOPE = environment.SCOPE;

  oktaAuth = new OktaAuth({
    clientId: this.CLIENT_ID,
    issuer: this.ISSUER,
    redirectUri: this.LOGIN_REDIRECT_URI,
    pkce: true,
  });

  $isAuthenticated: Observable<boolean>;
  private observer: Observer<boolean>;
  constructor(private router: Router) {
    this.$isAuthenticated = new Observable((observer: Observer<boolean>) => {
      this.observer = observer;
      this.isAuthenticated().then((val) => {
        console.log(val)
        observer.next(val);
      });
    });
  }

  async isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    return !!(await this.oktaAuth.tokenManager.get('accessToken'));
  }

  login(originalUrl: string) {
    // Save current URL before redirect
    sessionStorage.setItem('okta-app-url', originalUrl || this.router.url);

    // Launches the login redirect.
    // this.oktaAuth.token.getWithRedirect({
    //   scopes: ['openid', 'email', 'profile'],
    // });
  }

  async handleAuthentication() {
    console.log("asdf")
    const tokens = await this.oktaAuth.token.parseFromUrl();
    tokens.forEach((token) => {
      console.log(token)
      if (token.idToken) {
        this.oktaAuth.tokenManager.add('idToken', token);
      }
      if (token.accessToken) {
        this.oktaAuth.tokenManager.add('accessToken', token);
      }
    });

    if (await this.isAuthenticated()) {
      this.observer.next(true);
    }

    // Retrieve the saved URL and navigate back
    const url = sessionStorage.getItem('okta-app-url');
    this.router.navigateByUrl(url);
  }

  async logout() {
    await this.oktaAuth.signOut({
      postLogoutRedirectUri: this.LOGOUT_REDIRECT_URI,
    });
  }
}
