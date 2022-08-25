import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  getConnection,
  getRepository,
  MongoRepository,
  Repository,
  TreeRepository,
} from 'typeorm';
import { Role } from '../entity/Role';
import { PaginationOptions } from '../shared/types/pagination-options';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { User } from '../entity/User';

@Injectable()
export class RoleService implements OnApplicationBootstrap {
  readonly maxReturned = 20;
  repo: Repository<Role> | MongoRepository<Role> | TreeRepository<Role>;

  constructor() {}

  onApplicationBootstrap() {
    this.repo = getRepository(Role);
  }

  async create(createRoleDto: CreateRoleDto) {
    const newResource = this.repo.create(createRoleDto);
    const saveResult = await this.repo.save(newResource);
    return this.findOne(saveResult.id);
  }

  async assign(assignRoleDto: AssignRoleDto) {
    return await getConnection()
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(assignRoleDto.userId)
      .add(assignRoleDto.roleId);
  }

  async unassign(assignRoleDto: AssignRoleDto) {
    return await getConnection()
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(assignRoleDto.userId)
      .remove(assignRoleDto.roleId);
  }

  async findAll(pagination: PaginationOptions) {
    const [results, total] = await this.repo.findAndCount(
      pagination.query(this.maxReturned),
    );
    return {
      data: results,
      total: total,
    };
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return await this.repo.update({ id }, updateRoleDto);
  }

  async remove(id: number) {
    return await this.repo.softDelete(id);
  }
}
