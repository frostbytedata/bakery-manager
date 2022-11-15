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
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { PaginationOptions } from '../shared/types/pagination-options';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User as UserDecorator } from '../shared/decorators/user.decorator';
import { User } from '../entity/User';
import { MustOwnResponse } from '../shared/interceptors/response-owner.interceptor';

@UseGuards(JwtAuthGuard)
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  async upsert(
    @Body() ingredientDto: CreateIngredientDto | UpdateIngredientDto,
    @Request() req,
    @UserDecorator() user,
  ) {
    return this.ingredientService.upsert({
      defaultUnitId: 3,
      ...ingredientDto,
      user: { id: user.id } as User,
    });
  }

  @UseInterceptors(MustOwnResponse('userId'))
  @Get()
  findAll(@Request() request) {
    return this.ingredientService.findAll(
      new PaginationOptions(request.query?.page, request.query?.amount),
    );
  }

  @UseInterceptors(MustOwnResponse('userId'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.ingredientService.update(+id, updateIngredientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientService.remove(+id);
  }
}
