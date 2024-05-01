import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiConfig } from 'src/config/types';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import { ChatDto } from 'src/modules/chat/dtos/chat.dto';

@Injectable()
export class AiService {
  @Inject() private configService: ConfigService;

  prompt(chatDto: ChatDto, model: 'gpt' | 'gemini') {
    // return this.configService.get<AiConfig>('gpt').secret;
    if (model === 'gpt') {
      return this.gpt(chatDto);
    }
    if (model === 'gemini') {
      return this.gemini(chatDto);
    }
  }

  private async gemini(chatDto: ChatDto): Promise<string> {
    const config = this.configService.get<AiConfig>('gemini');

    const genAI = new GoogleGenerativeAI(config.secret);
    const model = genAI.getGenerativeModel({ model: config.model });
    const prompt = chatDto.content;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  }

  private async gpt(chatDto: ChatDto): Promise<string> {
    const config = this.configService.get<AiConfig>('gpt');
    const openai = new OpenAI({
      apiKey: config.secret,
    });
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Sen bir psikologsun. Bir psikolog gibi konuş',
        },
        { role: 'user', content: chatDto.content },
      ],
      model: config.model,
    });

    return completion.choices[0].message.content;
  }
}
