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
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { PaginationOptions } from '../shared/types/pagination-options';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User as UserDecorator } from '../shared/decorators/user.decorator';
import { User } from '../entity/User';
import { Unit } from '../entity/Unit';
import { MustOwnResponse } from '../shared/interceptors/response-owner.interceptor';

@UseGuards(JwtAuthGuard)
@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  async create(
    @Body() createUnitDto: CreateUnitDto,
    @Request() req,
    @UserDecorator() user,
  ) {
    return this.unitService.create({
      ...createUnitDto,
    });
  }

  @UseInterceptors(MustOwnResponse('userId'))
  @Get()
  findAll(@Request() request) {
    return this.unitService.findAll(
      new PaginationOptions(request.query?.page, request.query?.amount),
    );
  }

  @UseInterceptors(MustOwnResponse('userId'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUnitDto: UpdateUnitDto,
  ) {
    return this.unitService.update(+id, updateUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitService.remove(+id);
  }
}
