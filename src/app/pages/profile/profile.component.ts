import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public profileJson: string = '';
  user: User;

  constructor() {}

  setUser(): void {
    AuthService.getLoggedInUser().subscribe((user: User) => {
      this.user = user;
      this.profileJson = JSON.stringify(this.user);
    });
  }

  ngOnInit() {
    this.setUser();
  }
}
