import * as mongoDB from "mongodb";
import { appConfig } from "./config";
import { fetchCurrencyExchangeRateOnce, readLocalCache } from "./currencyRate";

export class ApiError implements Error {
    name: string;
    message: string;
    stack?: string | undefined;
    status: number;

    constructor(status: number, message: string) {
        this.message = message;
        this.status = status;
        this.name = "APIError";
    }
}

export const logStr = (s: string) => {
    console.log(s);
    return s;
}

export const MongoDBOrigin: { db?: mongoDB.Db, client?: mongoDB.MongoClient } = {};

export const connectToMongoDB = async () => {
    MongoDBOrigin.client = new mongoDB.MongoClient(appConfig.MONGO_DB);
    await MongoDBOrigin.client.connect();
    MongoDBOrigin.db = MongoDBOrigin.client.db(process.env.DB_NAME);
    return;
}

export const runDailyTask = async (task: () => Promise<void>) => {
    let warning = false;
    while (true) {
        const nextWake = new Date();
        const currMilliseconds = nextWake.getTime();
        nextWake.setDate(nextWake.getDate() + 1);
        nextWake.setUTCHours(0, 0, 0, 0);
        const wait = nextWake.getTime() - currMilliseconds;
        if (wait < 82800000) {
            if (warning) {
                console.log("daily task runs too frequently");
                break;
            }
            warning = true;
        }
        await new Promise(r => setTimeout(r, wait));
        await task();
    }
}

export const fetchCurrencyExchangeRateTask = async () => {
    if (!(await readLocalCache())) {
        await fetchCurrencyExchangeRateOnce();
    }
    runDailyTask(fetchCurrencyExchangeRateOnce);
}