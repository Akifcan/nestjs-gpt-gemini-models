import { IsNotEmpty, MaxLength } from 'class-validator';

export class ChatDto {
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;
}
