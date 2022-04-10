import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptoModule } from './modules/crypto/crypto.module';
import { ConfigModule } from '@nestjs/config';

const modules = [CryptoModule];

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_IP}/${process.env.DB_NAME}`,
    ),
    ...modules,
  ],
})
export class AppModule {}
