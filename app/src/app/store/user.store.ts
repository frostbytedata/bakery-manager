import { Injectable } from '@angular/core';
import { User, UserLoginDto, UserRegisterDto } from '../models/user.model';
import { BaseStore } from './base.store';

@Injectable({
  providedIn: 'root',
})
export class UserStore extends BaseStore {
  constructor() {
    super({
      user: {} as User,
      accessToken: '',
      loginForm: {} as UserLoginDto,
      registerForm: {} as UserRegisterDto,
    });
  }
}
