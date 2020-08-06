import { Component, OnInit } from '@angular/core';
import { CircleService } from './services/circle.service';
import { Post } from './models/post/post';
import { User } from './models/user/user';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'circle-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  ngOnInit(): void {}
  constructor(public auth: AuthService) { }

}
