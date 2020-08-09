import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'circle-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {
  sidenavOpen: boolean = false;
  @Input() user: User;
  constructor() {}

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) this.user = changes.user.currentValue;
  }

  toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }
}
