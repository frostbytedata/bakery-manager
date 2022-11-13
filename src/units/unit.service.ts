import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MongoRepository, Repository, TreeRepository } from 'typeorm';
import { PaginationOptions } from '../shared/types/pagination-options';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { dataSource } from '../database.providers';
import { Unit } from '../entity/Unit';

@Injectable()
export class UnitService implements OnApplicationBootstrap {
  readonly maxReturned = 20;
  repo: Repository<Unit> | MongoRepository<Unit> | TreeRepository<Unit>;

  constructor() {}

  onApplicationBootstrap() {
    this.repo = dataSource.getRepository(Unit);
  }

  async create(createUnitDto: CreateUnitDto) {
    const newResource = this.repo.create(createUnitDto);
    const saveResult = await this.repo.save(newResource);
    return this.findOne(saveResult.id);
  }

  async findAll(pagination: PaginationOptions) {
    const [results, total] = await this.repo.findAndCount({
      ...pagination.query(this.maxReturned),
    });
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

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    return await this.repo.update({ id }, updateUnitDto);
  }

  async remove(id: number) {
    return await this.repo.softDelete(id);
  }
}
