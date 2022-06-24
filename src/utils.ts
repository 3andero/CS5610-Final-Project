import * as mongoDB from "mongodb";
import { appConfig } from "./config";

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