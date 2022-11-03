import { Injectable } from '@angular/core';
import { User, UserLoginDto, UserRegisterDto } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly _data: any = {
    user: {} as User,
    accessToken: '',
    loginForm: {} as UserLoginDto,
    registerForm: {} as UserRegisterDto,
  };
  public get data() {
    return this._data;
  }

  constructor() {}

  ngOnInit() {}

  modify(propertyName: string, newValue: any) {
    if (this._data.hasOwnProperty(propertyName) && newValue) {
      if (typeof newValue === 'string' || typeof newValue === 'number') {
        this._data[propertyName] = newValue;
      } else {
        this._data[propertyName] = Object.assign({}, newValue);
      }
    }
  }
}
