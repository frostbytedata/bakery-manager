import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as crypto from 'crypto';
import { AuthService } from '../auth/auth.service';
import { PaginationOptions } from '../shared/types/pagination-options';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // Include a few default values
    const salt = crypto.randomBytes(32);
    const defaults = {
      isActive: true,
      salt: salt.toString('hex'),
    };
    createUserDto.password = await this.authService.hashPassword(
      createUserDto.password,
      salt.toString('hex'),
    );
    return this.usersService.create({ ...createUserDto, ...defaults });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() request) {
    return this.usersService.findAll(
      new PaginationOptions(request.query?.page, request.query?.amount),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
