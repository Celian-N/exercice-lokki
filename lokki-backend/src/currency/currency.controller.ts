import { Controller, Get, Param } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyParams } from './currency.dto';
import { Currency } from './currency.types';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get()
  async getCurrencies() {
    const { result } = await this.currencyService.getCurrencies();

    if (!result?.response) return { result: [] };
    return {
      result: result.response.map((currency: Currency) => ({
        name: currency.name,
        shortCode: currency.short_code,
      })),
    };
  }

  @Get(':baseCurrency')
  async getCurrencyChange(@Param() params: CurrencyParams) {
    const { baseCurrency } = params;
    const { result } =
      await this.currencyService.getCurrencyChange(baseCurrency);

    return { result: result?.response };
  }
}
