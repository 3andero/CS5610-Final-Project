import { appConfig } from "config";
import { CurrencyCountryCode } from "currency-country-code";
import React, { createContext, useEffect, useState } from "react";

const defaultContext = {
  exchangeRate: {} as CurrencyCountryCode,
};

export const Currency = createContext(defaultContext);

export const CurrencyContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [rate, setRate] = useState({} as CurrencyCountryCode);
  useEffect(() => {
    (async () => {
      const rsp = await fetch(`${appConfig.API_SERVER_DOMAIN}currency`);
      setRate((await rsp.json()) as CurrencyCountryCode);
    })();
  }, []);

  return (
    <Currency.Provider
      value={{
        exchangeRate: rate,
      }}
    >
      {children}
    </Currency.Provider>
  );
};

const supportedConversion: Record<string, keyof CurrencyCountryCode> = {
  Canada: "CAD",
  US: "USD",
  Japan: "JPY",
  China: "CNY",
  India: "INR",
};

export const convertPrice = (
  rates: CurrencyCountryCode,
  country: string,
  price?: number
) => {
  if (price && country in supportedConversion) {
    const currencyName = supportedConversion[country];
    return `${currencyName} ${(
      (price / rates.CAD!) *
      rates[currencyName]!
    ).toFixed()}`;
  }
  return "Price Unavailable";
};
