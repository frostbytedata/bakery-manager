import { Test, TestingModule } from '@nestjs/testing';
import { EarningsScraperController } from './earnings-scraper.controller';

describe('EarningsScraperController', () => {
  let controller: EarningsScraperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EarningsScraperController],
    }).compile();

    controller = module.get<EarningsScraperController>(EarningsScraperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
