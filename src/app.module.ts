import { Module } from '@nestjs/common';
import { ChatModule } from './modules/chat/chat.module';
import { AiModule } from './services/ai/ai.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ChatModule,
    AiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
