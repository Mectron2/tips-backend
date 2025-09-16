import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CurrencyRepository } from './currency.repository';
import { Currency } from './entities/currency.entity';
import { CurrencyNotFoundException } from './exceptions/CurrencyNotFoundException';

@Injectable()
export class CurrencyService {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  create(createCurrencyDto: CreateCurrencyDto): Promise<Currency> {
    return this.currencyRepository.create(createCurrencyDto);
  }

  findAll(): Promise<Currency[]> {
    return this.currencyRepository.findAll();
  }

  findOne(id: number): Promise<Currency> {
    return this.currencyRepository.findOne(id);
  }

  async findByCode(code: string): Promise<Currency> {
    const currency = await this.currencyRepository.findByCode(code);
    if (!currency) {
      throw new CurrencyNotFoundException();
    }
    return currency;
  }
}
