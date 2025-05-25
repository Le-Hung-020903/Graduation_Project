import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGoogleGenerativeAiDto {
  @IsNotEmpty()
  @IsString()
  question: string;
}
