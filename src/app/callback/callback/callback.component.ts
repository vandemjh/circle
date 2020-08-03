import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from 'src/app/services/okta.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
})
export class CallbackComponent implements OnInit {
  constructor(private okta: OktaAuthService) {}

  ngOnInit() {
    // Handles the response from Okta and parses tokens
    this.okta.handleAuthentication();
  }
}
