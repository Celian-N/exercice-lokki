import { Injectable } from '@nestjs/common';
import { fetchData } from 'src/helpers/fetch.helper';

const API_KEY = '3TsyYBNnGwSguBZmCTT5NT9YCn4eKdfR';

@Injectable()
export class CurrencyService {
  getCurrencies() {
    return fetchData(
      `https://api.currencybeacon.com/v1/currencies?api_key=${API_KEY}&type=fiat`,
    );
  }
  getCurrencyChange(baseCurrency) {
    return fetchData(
      `https://api.currencybeacon.com/v1/latest?api_key=${API_KEY}&base=${baseCurrency}`,
    );
  }
}
