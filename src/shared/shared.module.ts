import { Module } from '@nestjs/common';
import { StandardService } from './services/standard.service';

@Module({
  controllers: [],
  providers: [StandardService],
  exports: [StandardService],
})
export class SharedModule {}
