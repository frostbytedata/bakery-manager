import { Test, TestingModule } from '@nestjs/testing';
import { UnitService } from './ingredient.service';

describe('IngredientService', () => {
  let service: UnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitService],
    }).compile();

    service = module.get<UnitService>(UnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
