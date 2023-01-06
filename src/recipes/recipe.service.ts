import {
  HttpException,
  HttpStatus,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import {
  MongoRepository,
  Repository,
  TreeRepository,
} from 'typeorm';
import { Recipe } from '../entity/Recipe';
import { PaginationOptions } from '../shared/types/pagination-options';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { dataSource } from '../database.providers';
import { RecipeAddIngredientDto } from './dto/recipe-add-ingredient.dto';
import { Ingredient } from '../entity/Ingredient';
import { RecipeToIngredient } from '../entity/RecipeToIngredient';
import { Unit } from '../entity/Unit';

@Injectable()
export class RecipeService implements OnApplicationBootstrap {
  readonly maxReturned = 300;
  repo: Repository<Recipe> | MongoRepository<Recipe> | TreeRepository<Recipe>;
  ingredientRepo:
    | Repository<Ingredient>
    | MongoRepository<Ingredient>
    | TreeRepository<Ingredient>;
  unitRepo: Repository<Unit> | MongoRepository<Unit> | TreeRepository<Unit>;
  recipeToIngredientRepo:
    | Repository<RecipeToIngredient>
    | MongoRepository<RecipeToIngredient>
    | TreeRepository<RecipeToIngredient>;

  constructor() {}

  onApplicationBootstrap() {
    this.repo = dataSource.getRepository(Recipe);
    this.recipeToIngredientRepo = dataSource.getRepository(RecipeToIngredient);
    this.ingredientRepo = dataSource.getRepository(Ingredient);
    this.unitRepo = dataSource.getRepository(Unit);
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
        ingredients: {
          ingredient: {
            defaultUnit: true,
          },
          unit: true,
        },
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
        ingredients: {
          ingredient: {
            defaultUnit: true,
          },
          unit: true,
        },
      },
    });
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return await this.repo.update({ id }, updateRecipeDto);
  }

  async remove(id: number) {
    return await this.repo.softDelete(id);
  }

  async addIngredient(recipeAddIngredientDto: RecipeAddIngredientDto) {
    const recipe = await this.repo.findOneBy({
      id: recipeAddIngredientDto.recipeId,
    });
    const ingredient = await this.ingredientRepo.findOneBy({
      id: recipeAddIngredientDto.ingredientId,
    });
    const unit = await this.unitRepo.findOneBy({
      id: recipeAddIngredientDto.unitId,
    });
    if (recipe && ingredient && unit) {
      return await this.recipeToIngredientRepo.save({
        recipe,
        ingredient,
        unit,
        ...recipeAddIngredientDto,
      });
    }
    return [];
  }

  async removeIngredient(ingredientId: number) {
    const ingredient = await this.recipeToIngredientRepo.findOneBy({
      id: ingredientId,
    });
    if (ingredient) {
      return await this.recipeToIngredientRepo.softDelete(
        ingredient.id,
      );
    } else {
      return new HttpException(
        'Ingredient not used in Recipe',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
