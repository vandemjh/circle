import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from './models/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'circle-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  user: User;

  ngOnInit(): void {}
  constructor(public auth: AuthService, private router: Router) {
    AuthService.getLoggedInUser().subscribe((user) => (this.user = user));
  }
}
