import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AiService } from 'src/services/ai/ai.service';
import { ChatDto } from './dtos/chat.dto';

@Controller('chat')
export class ChatController {
  @Inject() aiService: AiService;

  @Post()
  chat(@Body() chatDto: ChatDto) {
    return this.aiService.prompt(chatDto, 'gpt');
  }
}
