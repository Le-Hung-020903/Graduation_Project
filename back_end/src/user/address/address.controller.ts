import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Public } from 'src/Decorator/auth.decorator';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('create')
  create(@Body() createAddressDto: CreateAddressDto, @Req() req) {
    const userId: number = req.user?.id;
    return this.addressService.create(createAddressDto, userId);
  }

  @Get()
  findAll(@Req() req) {
    const userId: number = req.user?.id;
    return this.addressService.findAll(userId);
  }
  @Get('/get_all')
  getAllAddress(@Req() req) {
    const userId: number = req.user?.id;
    return this.addressService.getAllAddress(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
