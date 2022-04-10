import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptoSchema } from 'src/modules/crypto/crypto.schema';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { Cryptocurrency } from './crypto.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Cryptocurrency.name, schema: CryptoSchema },
    ]),
  ],
  controllers: [CryptoController],
  providers: [CryptoService],
})
export class CryptoModule {}
