import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/auth/auth.service';
import { OnAutoChange } from 'src/app/models/on-auto-change/on-auto-change';

@Component({
  selector: 'circle-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent extends OnAutoChange implements OnInit {
  sidenavOpen: boolean = false;
  @Input() user: User;
  constructor() {
    super();
  }

  ngOnInit(): void { }

  toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }
}
