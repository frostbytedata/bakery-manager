import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MongoRepository, Repository, TreeRepository } from 'typeorm';
import { Recipe } from '../entity/Recipe';
import { PaginationOptions } from '../shared/types/pagination-options';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { dataSource } from '../database.providers';

@Injectable()
export class RecipeService implements OnApplicationBootstrap {
  readonly maxReturned = 300;
  repo:
    | Repository<Recipe>
    | MongoRepository<Recipe>
    | TreeRepository<Recipe>;

  constructor() {}

  onApplicationBootstrap() {
    this.repo = dataSource.getRepository(Recipe);
  }

  async create(createRecipeDto: CreateRecipeDto) {
    const newResource = this.repo.create(createRecipeDto);
    const saveResult = await this.repo.save(newResource);
    return this.findOne(saveResult.id);
  }

  async upsert(recipeDto: CreateRecipeDto | UpdateRecipeDto) {
    return await this.repo.save(recipeDto);
  }

  async findAll(pagination: PaginationOptions) {
    const [results, total] = await this.repo.findAndCount({
      ...pagination.query(this.maxReturned),
      relations: {
        ingredients: true,
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
        ingredients: true,
      },
    });
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return await this.repo.update({ id }, updateRecipeDto);
  }

  async remove(id: number) {
    return await this.repo.softDelete(id);
  }
}
