import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { UsersService } from '../users/users.service';

@Module({
  imports: [],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
