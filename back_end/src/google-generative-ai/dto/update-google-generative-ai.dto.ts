import { PartialType } from '@nestjs/swagger';
import { CreateGoogleGenerativeAiDto } from './create-google-generative-ai.dto';

export class UpdateGoogleGenerativeAiDto extends PartialType(CreateGoogleGenerativeAiDto) {}
