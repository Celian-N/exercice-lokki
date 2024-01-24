import { fetchData } from "../helpers/api.helpers";
import { Currencies, Currency, CurrencyChanges } from "../types/currency.types";

class CurrencyService {
  async getCurrencies(): Promise<Currencies | null> {
    const url = `http://localhost:3001/currencies`;

    const { result, error } = await fetchData<Currencies>(url);
    if (error) {
      console.error(error);
    }

    return result;
  }
  async getCurrencyChange(
    baseCurrency: Currency
  ): Promise<CurrencyChanges | null> {
    const url = `http://localhost:3001/currencies/${baseCurrency}`;

    const { result, error } = await fetchData<CurrencyChanges>(url);
    if (error) {
      console.error(error);
    }
    return result;
  }
}

const currencyService = new CurrencyService();

export default currencyService;
