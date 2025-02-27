import { CreateUnitDto } from './create-unit.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUnitDto extends PartialType(CreateUnitDto) {
  updated_at: Date;
}
