import { appConfig } from "./config";
import fs from "fs";
import util from 'util';
import { CurrencyCountryCode } from "../frontend/src/currency-country-code";
// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

export const CurrencyExchangeRate = { rate: {} as CurrencyRate };

export const readLocalCache = async () => {
    let hasRead = false;
    try {
        await mkdir("./static");
    } catch (err: any) {
        if (err?.errno !== -17) {
            // file already exits
            console.log(err);
            throw err;
        }
    }
    try {
        const dataRaw = await readFile("./static/currencyExchangeRate.json", 'utf8');
        try {
            const data = JSON.parse(dataRaw) as CurrencyRate;
            if (data.result !== "success") {
                console.log("[CER]not success");
                return;
            }
            if (Object.keys(data.conversion_rates!).length === 0) {
                console.log("[CER]no rates");
                return;
            }
            if ((data.time_next_update_unix! * 1000) < new Date().getTime()) {
                console.log("[CER]out dated");
                return;
            }
            CurrencyExchangeRate.rate = data;
            hasRead = true;
        } catch (e) {
        }
    } catch (err) {
        if (err) return;
    }
    return hasRead;
}

export const fetchCurrencyExchangeRateOnce = async () => {
    console.log("update currency exchange rate");
    const val = await fetch(appConfig.CURRENCY_API_URL, {
        method: "GET"
    });
    CurrencyExchangeRate.rate = await val.json() as CurrencyRate;
    await writeRateToFile();
}

export const writeRateToFile = async () => {
    try {
        await writeFile("./static/currencyExchangeRate.json", JSON.stringify(CurrencyExchangeRate.rate));
    } catch (e) {
        throw e;
    }
}

export interface CurrencyRate {
    result?: string;
    "time_next_update_unix"?: number,
    "error-type"?: string;
    conversion_rates?: CurrencyCountryCode;
}