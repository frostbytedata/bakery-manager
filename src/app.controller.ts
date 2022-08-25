import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { RoleCheckGuard } from './shared/guards/role-check.guard';
import { MustOwnResponse } from './shared/interceptors/response-owner.interceptor';
import { AndRoles } from './shared/decorators/roles.decorator';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.generateJWT(req.user);
  }

  @UseGuards(JwtAuthGuard, RoleCheckGuard)
  @UseInterceptors(MustOwnResponse('userId'))
  @AndRoles(['superadmin'])
  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findOne(req.user.id);
  }
}
