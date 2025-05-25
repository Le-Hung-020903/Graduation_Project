import { Controller, Post, Body } from '@nestjs/common';
import { GoogleGenerativeAiService } from './google-generative-ai.service';
import { CreateGoogleGenerativeAiDto } from './dto/create-google-generative-ai.dto';
import { Public } from 'src/Decorator/auth.decorator';

@Controller('google-generative-ai')
export class GoogleGenerativeAiController {
  constructor(
    private readonly googleGenerativeAiService: GoogleGenerativeAiService,
  ) {}

  @Public()
  @Post()
  create(@Body() createGoogleGenerativeAiDto: CreateGoogleGenerativeAiDto) {
    return this.googleGenerativeAiService.chatbotAI(
      createGoogleGenerativeAiDto,
    );
  }
}
