import React, { FC, useEffect, useMemo, useState } from "react";
import { LokkiSelect } from "../LokkiSelect/LokkiSelect";
import { LokkiInput } from "../LokkiInput/LokkiInput";
import {
  Currencies,
  Currency,
  CurrencyChanges,
} from "../../types/currency.types";
import currencyService from "../../services/currency.service";
import { Title } from "../Title/Title";
import { Caption } from "../Caption/Caption";
import "./CurrencyConverter.scss";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";

type CurrencyConverterProps = {
  currencies?: Currencies;
};

export const CurrencyConverter: FC<CurrencyConverterProps> = ({
  currencies = [],
}) => {
  const currenciesOptions = useMemo(
    () =>
      currencies.map(({ shortCode, name }) => ({
        value: shortCode,
        label: `${name} (${shortCode})`,
      })),
    [currencies]
  );

  const [currencyChanges, setCurrencyChanges] = useState<
    Record<string, CurrencyChanges>
  >({});

  const [fromCurrency, setFromCurrency] = useState<string>(
    currenciesOptions[0]?.value
  );
  const [toCurrency, setToCurrency] = useState<string>(
    currenciesOptions[0]?.value
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

  useEffect(() => {
    if (!fromCurrency) return;
    getCurrencyChange(fromCurrency);
  }, []);

  const currentChange = useMemo(() => {
    if (!fromCurrency || !toCurrency) return;
    return currencyChanges[fromCurrency]?.rates[toCurrency] || 1;
  }, [fromCurrency, toCurrency, currencyChanges]);

  const onChangeFromValue = (newValue: string) => {
    setFromValue(newValue);
    if (currentChange && newValue) {
      const newToValue = Number(newValue) * currentChange;
      setToValue(newToValue.toString());
    }
  };

  const onChangeToValue = (newValue: string) => {
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

  return (
    <div className="currency-converter">
      <Caption color="black">1 {fromCurrency} égal</Caption>
      <Title color="white">
        <span>{`${currentChange} ${toCurrency}`}</span>
      </Title>
      <Caption color="lightgray">
        Valeur au{" "}
        {fromCurrency &&
          format(currencyChanges[fromCurrency]?.date || new Date(), "PP - p", {
            locale: fr,
          })}
      </Caption>
      <div className="currency-picker__wrapper">
        <div className="currency-picker">
          <LokkiInput
            placeholder="Montant"
            type="number"
            value={fromValue}
            onChange={(e) => onChangeFromValue(e.target.value)}
          />
          <LokkiSelect
            options={currenciesOptions}
            onChange={(e) => changeFromCurrency(e.target.value)}
          />
        </div>
        <div className="currency-picker">
          <LokkiInput
            placeholder="Montant"
            type="number"
            value={toValue}
            onChange={(e) => onChangeToValue(e.target.value)}
          />
          <LokkiSelect
            options={currenciesOptions}
            onChange={(e) => changeToCurrency(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
