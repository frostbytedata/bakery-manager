import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientController } from './ingredient.controller';

@Module({
  imports: [],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
