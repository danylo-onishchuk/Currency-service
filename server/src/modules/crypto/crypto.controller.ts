import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CreateCryptoDto } from './dto/create-crypto.dto';
import { UpdateCryptoDto } from './dto/update-crypto.dto';

@Controller('cryptocurrencys')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post()
  create(@Body() options: CreateCryptoDto) {
    return this.cryptoService.create(options);
  }

  @Get()
  findAll() {
    return this.cryptoService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string, @Query('period') period?: string) {
    return this.cryptoService.findOne(name, period);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() options: UpdateCryptoDto) {
    return this.cryptoService.updateOne(name, options);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.cryptoService.deleteOne(name);
  }
}
