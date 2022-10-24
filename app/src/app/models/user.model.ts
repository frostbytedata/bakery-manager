import { BaseModel } from './base.model';

export interface User extends BaseModel {
  email: string;
  roles: any[];
  isActive: boolean;
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserRegisterDto {
  email: string;
  name: string;
  password: string;
}
