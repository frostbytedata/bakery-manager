import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MongoRepository, Repository, TreeRepository } from 'typeorm';
import { User } from '../entity/User';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationOptions } from '../shared/types/pagination-options';
import { dataSource } from '../database.providers';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  readonly maxReturned = 20;
  repo: Repository<User> | MongoRepository<User> | TreeRepository<User>;

  constructor() {}

  onApplicationBootstrap() {
    this.repo = dataSource.getRepository(User);
  }

  async create(createUserDto: CreateUserDto) {
    const newResource = this.repo.create(createUserDto);
    await this.repo.save(newResource);
    return newResource;
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

  findOne(id: number, select?: string[]) {
    return this.repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.id = :id', { id })
      .addSelect(select ? select.map((item) => 'user.' + item) : [])
      .getOne();
  }

  findByEmail(email: string, select?: string[]) {
    return this.repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where('user.email = :email', { email })
      .addSelect(select ? select.map((item) => 'user.' + item) : [])
      .getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.repo.update({ id }, updateUserDto);
  }

  async remove(id: number) {
    return await this.repo.softDelete(id);
  }
}
