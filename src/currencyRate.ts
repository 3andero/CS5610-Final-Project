import { appConfig } from "./config";
import fs from "fs";
import util from 'util';
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
    conversion_rates?: {
        USD?: string;
        AED?: string;
        AFN?: string;
        ALL?: string;
        AMD?: string;
        ANG?: string;
        AOA?: string;
        ARS?: string;
        AUD?: string;
        AWG?: string;
        AZN?: string;
        BAM?: string;
        BBD?: string;
        BDT?: string;
        BGN?: string;
        BHD?: string;
        BIF?: string;
        BMD?: string;
        BND?: string;
        BOB?: string;
        BRL?: string;
        BSD?: string;
        BTN?: string;
        BWP?: string;
        BYN?: string;
        BZD?: string;
        CAD?: string;
        CDF?: string;
        CHF?: string;
        CLP?: string;
        CNY?: string;
        COP?: string;
        CRC?: string;
        CUP?: string;
        CVE?: string;
        CZK?: string;
        DJF?: string;
        DKK?: string;
        DOP?: string;
        DZD?: string;
        EGP?: string;
        ERN?: string;
        ETB?: string;
        EUR?: string;
        FJD?: string;
        FKP?: string;
        FOK?: string;
        GBP?: string;
        GEL?: string;
        GGP?: string;
        GHS?: string;
        GIP?: string;
        GMD?: string;
        GNF?: string;
        GTQ?: string;
        GYD?: string;
        HKD?: string;
        HNL?: string;
        HRK?: string;
        HTG?: string;
        HUF?: string;
        IDR?: string;
        ILS?: string;
        IMP?: string;
        INR?: string;
        IQD?: string;
        IRR?: string;
        ISK?: string;
        JEP?: string;
        JMD?: string;
        JOD?: string;
        JPY?: string;
        KES?: string;
        KGS?: string;
        KHR?: string;
        KID?: string;
        KMF?: string;
        KRW?: string;
        KWD?: string;
        KYD?: string;
        KZT?: string;
        LAK?: string;
        LBP?: string;
        LKR?: string;
        LRD?: string;
        LSL?: string;
        LYD?: string;
        MAD?: string;
        MDL?: string;
        MGA?: string;
        MKD?: string;
        MMK?: string;
        MNT?: string;
        MOP?: string;
        MRU?: string;
        MUR?: string;
        MVR?: string;
        MWK?: string;
        MXN?: string;
        MYR?: string;
        MZN?: string;
        NAD?: string;
        NGN?: string;
        NIO?: string;
        NOK?: string;
        NPR?: string;
        NZD?: string;
        OMR?: string;
        PAB?: string;
        PEN?: string;
        PGK?: string;
        PHP?: string;
        PKR?: string;
        PLN?: string;
        PYG?: string;
        QAR?: string;
        RON?: string;
        RSD?: string;
        RUB?: string;
        RWF?: string;
        SAR?: string;
        SBD?: string;
        SCR?: string;
        SDG?: string;
        SEK?: string;
        SGD?: string;
        SHP?: string;
        SLL?: string;
        SOS?: string;
        SRD?: string;
        SSP?: string;
        STN?: string;
        SYP?: string;
        SZL?: string;
        THB?: string;
        TJS?: string;
        TMT?: string;
        TND?: string;
        TOP?: string;
        TRY?: string;
        TTD?: string;
        TVD?: string;
        TWD?: string;
        TZS?: string;
        UAH?: string;
        UGX?: string;
        UYU?: string;
        UZS?: string;
        VES?: string;
        VND?: string;
        VUV?: string;
        WST?: string;
        XAF?: string;
        XCD?: string;
        XDR?: string;
        XOF?: string;
        XPF?: string;
        YER?: string;
        ZAR?: string;
        ZMW?: string;
        ZWL?: string;
    }
}