import { useMemo, useState } from "react";
import { Currencies, Currency, CurrencyChanges } from "../types/currency.types";
import currencyService from "../services/currency.service";

export const useCurrencyConversion = (currencies: Currencies) => {
  const [currencyChanges, setCurrencyChanges] = useState<
    Record<string, CurrencyChanges>
  >({});

  const [fromCurrency, setFromCurrency] = useState<string>(
    currencies[0]?.shortCode
  );
  const [toCurrency, setToCurrency] = useState<string>(
    currencies[0]?.shortCode
  );

  const [fromValue, setFromValue] = useState<string>("");
  const [toValue, setToValue] = useState<string>("");

  const getCurrencyChange = async (currency: Currency) => {
    const change = await currencyService.getCurrencyChange(currency);
    if (!change) return;
    setCurrencyChanges((currencyChanges) => ({
      ...currencyChanges,
      [change.base]: change,
    }));
    return change;
  };

  const currentChange = useMemo(() => {
    if (!fromCurrency || !toCurrency) return;
    return currencyChanges[fromCurrency]?.rates[toCurrency] || 1;
  }, [fromCurrency, toCurrency, currencyChanges]);

  const currencyDate = useMemo(
    () => currencyChanges[fromCurrency]?.date,
    [currencyChanges, fromCurrency]
  );

  const changeFromValue = (newValue: string) => {
    setFromValue(newValue);
    if (currentChange && newValue) {
      const newToValue = Number(newValue) * currentChange;
      setToValue(newToValue.toString());
    }
  };

  const changeToValue = (newValue: string) => {
    setToValue(newValue);
    if (currentChange) {
      const newFromValue = Number(newValue) / currentChange;
      setFromValue(newFromValue.toString());
    }
  };

  const changeFromCurrency = async (newValue: string) => {
    setFromCurrency(newValue);
    if (!currencyChanges[newValue]) {
      const change = await getCurrencyChange(newValue);
      const rate = change?.rates[toCurrency] || 1;
      const newToValue = rate * Number(fromValue);
      setToValue(newToValue.toString());
    }
  };

  const changeToCurrency = async (newValue: string) => {
    setToCurrency(newValue);
    const rate = currencyChanges[fromCurrency]?.rates[newValue] || 1;
    const newToValue = rate * Number(fromValue);
    setToValue(newToValue.toString());
  };

  return {
    fromCurrency,
    toCurrency,
    currentChange,
    currencyDate,
    fromValue,
    toValue,
    changeFromCurrency,
    changeToCurrency,
    changeFromValue,
    changeToValue,
    getCurrencyChange,
  };
};
