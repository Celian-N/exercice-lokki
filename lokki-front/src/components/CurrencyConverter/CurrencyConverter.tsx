import React, { FC, useEffect, useMemo } from "react";
import { LokkiSelect } from "../LokkiSelect/LokkiSelect";
import { LokkiInput } from "../LokkiInput/LokkiInput";
import { Currencies } from "../../types/currency.types";
import { Title } from "../Title/Title";
import { Caption } from "../Caption/Caption";
import "./CurrencyConverter.scss";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { useCurrencyConversion } from "../../composable/useCurrency";

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

  const {
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
  } = useCurrencyConversion(currencies);

  useEffect(() => {
    if (!fromCurrency) return;
    getCurrencyChange(fromCurrency);
  }, []);

  return (
    <div className="currency-converter">
      <Caption color="black">1 {fromCurrency} égal</Caption>
      <Title color="white">
        <span>{`${currentChange} ${toCurrency}`}</span>
      </Title>
      <Caption color="lightgray">
        Valeur au{" "}
        {fromCurrency &&
          format(currencyDate || new Date(), "PP - p", {
            locale: fr,
          })}
      </Caption>
      <div className="currency-picker__wrapper">
        <div className="currency-picker">
          <LokkiInput
            placeholder="Montant"
            type="number"
            value={fromValue}
            onChange={(e) => changeFromValue(e.target.value)}
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
            onChange={(e) => changeToValue(e.target.value)}
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
