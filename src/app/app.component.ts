import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'circle-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void { }
  constructor(public auth: AuthService) { }

}
