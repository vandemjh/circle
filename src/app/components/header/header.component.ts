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
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.hdPictures =
      localStorage.getItem('hdPictures') === 'true' ? true : false;
    environment.minified = this.hdPictures;
  }
  
  toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }
  
  toggleHDPictures(): void {
    this.hdPictures = !this.hdPictures;
    localStorage.setItem('hdPictures', `${this.hdPictures}`);
    environment.minified = this.hdPictures;
  }
}
