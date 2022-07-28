import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { EarningsScraperController } from './earnings-scraper/earnings-scraper.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  controllers: [AppController, EarningsScraperController],
  providers: [AppService],
})
export class AppModule {}
