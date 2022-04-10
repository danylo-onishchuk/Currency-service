import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CryptocurrencyDocument = Cryptocurrency & Document;

@Schema({ versionKey: false })
export class Cryptocurrency {
  @Prop()
  name: string;
}

export const CryptoSchema = SchemaFactory.createForClass(Cryptocurrency);
