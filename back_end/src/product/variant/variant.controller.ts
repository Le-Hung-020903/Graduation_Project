import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VariantService } from './variant.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Controller('variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Post('create')
  create(@Body() createVariantDto: CreateVariantDto) {
    return this.variantService.create(createVariantDto);
  }

  @Get()
  findAll() {
    return this.variantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVariantDto: UpdateVariantDto[],
  ) {
    return this.variantService.update(updateVariantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantService.remove(+id);
  }
}
