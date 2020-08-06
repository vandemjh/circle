import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileJson: string = "";

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.userProfile.subscribe(
      profile => {
        console.log(profile)
        this.profileJson = JSON.stringify(profile, null, 2)}
    );
  }

}
