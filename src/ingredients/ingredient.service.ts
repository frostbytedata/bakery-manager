import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MongoRepository, Repository, TreeRepository } from 'typeorm';
import { Ingredient } from '../entity/Ingredient';
import { PaginationOptions } from '../shared/types/pagination-options';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { dataSource } from '../database.providers';

@Injectable()
export class IngredientService implements OnApplicationBootstrap {
  readonly maxReturned = 20;
  repo:
    | Repository<Ingredient>
    | MongoRepository<Ingredient>
    | TreeRepository<Ingredient>;

  constructor() {}

  onApplicationBootstrap() {
    this.repo = dataSource.getRepository(Ingredient);
  }

  async create(createIngredientDto: CreateIngredientDto) {
    const newResource = this.repo.create(createIngredientDto);
    const saveResult = await this.repo.save(newResource);
    return this.findOne(saveResult.id);
  }

  async findAll(pagination: PaginationOptions) {
    const [results, total] = await this.repo.findAndCount({
      ...pagination.query(this.maxReturned),
      relations: {
        defaultUnit: true,
      },
    });
    return {
      data: results,
      total: total,
    };
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: {
        defaultUnit: true,
      },
    });
  }

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return await this.repo.update({ id }, updateIngredientDto);
  }

  async remove(id: number) {
    return await this.repo.softDelete(id);
  }
}
