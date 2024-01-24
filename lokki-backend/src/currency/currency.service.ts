import { Injectable } from '@nestjs/common';
import { fetchData } from 'src/helpers/fetch.helper';

const API_KEY = '3TsyYBNnGwSguBZmCTT5NT9YCn4eKdfR';

const CURRENCY_BEACON_API = 'https://api.currencybeacon.com/v1';

@Injectable()
export class CurrencyService {
  getCurrencies() {
    return fetchData(
      `${CURRENCY_BEACON_API}/currencies?api_key=${API_KEY}&type=fiat`,
    );
  }
  getCurrencyChange(baseCurrency) {
    return fetchData(
      `${CURRENCY_BEACON_API}/latest?api_key=${API_KEY}&base=${baseCurrency}`,
    );
  }
}
