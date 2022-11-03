import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UserLoginDto, UserRegisterDto } from '../models/user.model';
import { UnsubscribeOnDestroyAdapter } from '../shared/unsub-on-destroy';
import { map, tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { UserStore } from '../store/user.store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService extends UnsubscribeOnDestroyAdapter {
  constructor(
    private baseService: BaseService,
    private router: Router,
    private userStore: UserStore,
  ) {
    super();
  }
  getSelf() {
    return this.baseService.get('/users/self').subscribe((userResponse) => {
      this.userStore.modify('user', userResponse?.body);
    });
  }
  login(loginPayload: UserLoginDto) {
    return this.baseService.post('/auth/login/', loginPayload).pipe(
      tap((loginResult: HttpResponse<any>): void => {
        if (loginResult.status === 201) {
          if (loginResult?.body?.access_token) {
            this.baseService.setToken(loginResult?.body?.access_token);
            this.getSelf();
          }
          this.router.navigate(['/home']);
        }
      }),
      map((loginResult: HttpResponse<any>): any => {
        return loginResult?.body;
      }),
    );
  }
  register(registerPayload: UserRegisterDto) {
    return this.baseService.post('/users', registerPayload);
  }
}
