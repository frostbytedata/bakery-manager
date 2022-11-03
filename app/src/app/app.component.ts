import { Component, OnInit } from '@angular/core';
import { BaseService } from './services/base.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(
    private baseService: BaseService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (!this.baseService.tokenExpired()) {
      this.userService.getSelf();
    } else {
      this.router.navigate(['login']);
    }
  }
}
