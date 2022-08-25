import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email, [
      'salt',
      'password',
    ]);
    if (user) {
      const passwordString = await this.hashPassword(password, user.salt);
      if (user.password === passwordString) {
        const { password, salt, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        310000,
        64,
        'sha512',
        (err, hashedPassword) => {
          if (err) {
            console.error(err);
            reject(err);
          }
          resolve(hashedPassword.toString('hex'));
        },
      );
    });
  }

  async generateJWT(_user: any) {
    const user = await this.usersService.findOne(_user.id);
    if (user) {
      const payload = {
        email: _user.email,
        sub: _user.id || _user._id,
        roles: user.roles.map((role) => role.name),
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
