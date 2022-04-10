import { Model } from 'mongoose';
import {
  BadRequestException,
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCryptoDto } from './dto/create-crypto.dto';
import { Cryptocurrency } from './crypto.schema';
import { UpdateCryptoDto } from './dto/update-crypto.dto';
import { catchError } from 'rxjs/operators';
import {
  configForCoinAPIRequests,
  defaultPeriod,
  Period,
  periodMapper,
} from 'src/variables';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CryptoService {
  constructor(
    private httpService: HttpService,
    @InjectModel(Cryptocurrency.name) private cryptoModel: Model<Crypto>,
  ) {}

  async create(createCryptoDto: CreateCryptoDto): Promise<Crypto> {
    const createdCrypto = new this.cryptoModel(createCryptoDto);
    return createdCrypto.save();
  }

  async findAll(): Promise<Crypto[]> {
    return this.cryptoModel.find().exec();
  }

  async findOne(name: string, period?: string) {
    // return this.cryptoModel.findOne({ name }).exec();
    const responce = await this.getPriceByCryptoWithPeriod(
      name,
      periodMapper[period],
    );

    return responce;
  }

  async deleteOne(name: string) {
    return this.cryptoModel.deleteOne({ name }).exec();
  }

  async updateOne(name: string, options: UpdateCryptoDto) {
    return this.cryptoModel.updateOne({ name }, options).exec();
  }

  async getPriceByCryptoWithPeriod(cryptoName: string, periodId?: Period) {
    const period = periodId || defaultPeriod;
    const url = `https://rest.coinapi.io/v1/exchangerate/${cryptoName}/USD/history?period_id=${period}&time_start=2022-01-01T00:00:00&limit=10`;

    try {
      const responce = await lastValueFrom(
        this.httpService.get(url, configForCoinAPIRequests),
      );

      return responce;
    } catch (error) {
      switch (error.response.status) {
        case 400:
          throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
        case 429:
          throw new HttpException(
            error.response.data,
            HttpStatus.TOO_MANY_REQUESTS,
          );
        case 503:
          throw new HttpException(
            error.response.data,
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        default:
          throw new HttpException(
            error.response.data,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
