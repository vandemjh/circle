import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { OnAutoChange } from 'src/app/models/on-auto-change/on-auto-change';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'circle-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent extends OnAutoChange implements OnInit {
  sidenavOpen: boolean = false;
  hdPictures: boolean = false;
  @Input() user: User;
  promptEvent: any;
  ignoreInstall: boolean;
  displayMode = 'browser tab';
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.ignoreInstall = false;
    this.hdPictures =
      localStorage.getItem('hdPictures') === 'true' ? true : false;
    environment.minified = this.hdPictures;
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.promptEvent = event;
      // console.log(event);
    });
    window.addEventListener('appinstalled', () => {
      this.ignoreInstall = true;
    });
    window.addEventListener('DOMContentLoaded', () => {
      if (!Navigator['standalone'] && Navigator['standalone'].standalone) {
        this.displayMode = 'standalone-ios';
      }
      if (window.matchMedia('(display-mode: standalone)').matches) {
        this.displayMode = 'standalone';
      }
      // Log launch display mode to analytics
      if (
        this.displayMode === 'standalone' ||
        this.displayMode === 'standalone-ios'
      )
        this.ignoreInstall = true;
    });
  }

  toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }

  toggleHDPictures(): void {
    this.hdPictures = !this.hdPictures;
    localStorage.setItem('hdPictures', `${this.hdPictures}`);
    environment.minified = this.hdPictures;
  }

  installPwa(): void {
    if (this.promptEvent != null) {
      this.promptEvent.prompt();
      this.promptEvent.userChoice.then((result) => {
        if (!result && result.outcome === 'accepted') this.ignoreInstall = true;
      });
    }
    this.promptEvent = null;
  }
}
