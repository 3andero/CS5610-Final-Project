import express from "express";
import { CurrencyExchangeRate } from "../currencyRate";

export const currency = express.Router();

currency.get("/", (req, res, next) => {
    res.status(200).json(CurrencyExchangeRate.rate.conversion_rates);
});