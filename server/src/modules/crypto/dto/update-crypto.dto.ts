import { CreateCryptoDto } from './create-crypto.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCryptoDto extends PartialType(CreateCryptoDto) {}
