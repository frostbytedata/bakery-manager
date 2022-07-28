import { Controller, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';

@Controller('earnings-scraper')
export class EarningsScraperController {
  private readonly logger = new Logger(EarningsScraperController.name);
  constructor(private readonly httpService: HttpService) {
    this.testCall();
  }
  @Cron('*/5 * * * * *')
  async handleCron() {
    this.logger.debug('Called every 5 seconds');
  }

  async testCall() {
    try {
      const response = await this.httpService.get(
        'https://financialmodelingprep.com/api/v3/income-statement/AAPL?limit=120&apikey=5e65eb41d29d6c0683e6fc5baf0d312a',
      );
      response.subscribe({
        next: (data) => {
          this.logger.debug(data);
        },
        error: (err) => {
          this.logger.error(err);
        },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
