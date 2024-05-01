import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
