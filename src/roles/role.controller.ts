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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginationOptions } from '../shared/types/pagination-options';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrRoles } from '../shared/decorators/roles.decorator';
import { RoleCheckGuard } from '../shared/guards/role-check.guard';
import { AssignRoleDto } from './dto/assign-role.dto';

@UseGuards(JwtAuthGuard, RoleCheckGuard)
@OrRoles(['admin', 'superadmin'])
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto, @Request() req) {
    return this.roleService.create({
      ...createRoleDto,
    });
  }

  @Post('assign')
  async assign(@Body() assignRoleDto: AssignRoleDto, @Request() req) {
    return this.roleService.assign({
      ...assignRoleDto,
    });
  }

  @Post('unassign')
  async unassign(@Body() assignRoleDto: AssignRoleDto, @Request() req) {
    return this.roleService.unassign({
      ...assignRoleDto,
    });
  }

  @Get()
  findAll(@Request() request) {
    return this.roleService.findAll(
      new PaginationOptions(request.query?.page, request.query?.amount),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
