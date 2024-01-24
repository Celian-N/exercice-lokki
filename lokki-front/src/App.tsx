import React, { useEffect, useState } from "react";
import "./App.scss";
import { Currencies } from "./types/currency.types";
import currencyService from "./services/currency.service";
import { CurrencyConverter } from "./components/CurrencyConverter/CurrencyConverter";
const App = () => {
  const [currencies, setCurrencies] = useState<Currencies | null>(null);

  const getCurrencies = async () => {
    const fetchCurrencies = await currencyService.getCurrencies();
    if (!fetchCurrencies) return;
    setCurrencies(fetchCurrencies);
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <main>{currencies && <CurrencyConverter currencies={currencies} />}</main>
  );
};

export default App;
