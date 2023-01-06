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
  UseInterceptors,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PaginationOptions } from '../shared/types/pagination-options';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User as UserDecorator } from '../shared/decorators/user.decorator';
import { User } from '../entity/User';
import { MustOwnResponse } from '../shared/interceptors/response-owner.interceptor';
import { RecipeAddIngredientDto } from './dto/recipe-add-ingredient.dto';

@UseGuards(JwtAuthGuard)
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async upsert(
    @Body() recipeDto: CreateRecipeDto | UpdateRecipeDto,
    @Request() req,
    @UserDecorator() user,
  ) {
    return this.recipeService.upsert({
      ...recipeDto,
      user: { id: user.id } as User,
    });
  }

  @UseInterceptors(MustOwnResponse('userId'))
  @Get()
  findAll(@Request() request) {
    return this.recipeService.findAll(
      new PaginationOptions(request.query?.page, request.query?.amount),
    );
  }

  @UseInterceptors(MustOwnResponse('userId'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }

  @Post('ingredient')
  async addIngredient(
    @Body() recipeAddIngredientDto: RecipeAddIngredientDto,
    @Request() req,
    @UserDecorator() user,
  ) {
    return this.recipeService.addIngredient({
      ...recipeAddIngredientDto,
    });
  }

  @Delete('ingredient/:ingredientId')
  removeIngredient(@Param('ingredientId') ingredientId: string) {
    return this.recipeService.removeIngredient(+ingredientId);
  }
}
