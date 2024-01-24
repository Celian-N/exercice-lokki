export type Currency = string;

export type CurrencyChange = number;

export type Currencies = { name: string; shortCode: string }[];

export type CurrencyChanges = {
  base: string;
  date: string;
  rates: Record<string, CurrencyChange>;
};
