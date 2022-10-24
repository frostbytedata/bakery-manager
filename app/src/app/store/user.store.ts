import { Injectable } from '@angular/core';
import { User, UserLoginDto, UserRegisterDto } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly _data: any = {
    user: {} as User,
    loginForm: {} as UserLoginDto,
    registerForm: {} as UserRegisterDto,
  };
  public get data() {
    return this._data;
  }

  constructor() {}

  ngOnInit() {}

  modify(propertyName: string, newValue: any) {
    if (this._data[propertyName] && newValue) {
      this._data[propertyName] = Object.assign({}, newValue);
    }
  }
}
