import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UnitService } from './unit.service';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Public } from 'src/Decorator/auth.decorator';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post('create')
  createUnitDto(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.create(createUnitDto);
  }

  @Patch(':id')
  updateUnitDto(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitService.update(+id, updateUnitDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.unitService.findAll();
  }
}
