import config_raw from "../.env.json";
import { readConfig } from "../frontend/src/config-utils";

interface BaseAppConfig {
    API_PORT: number;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    ISSUER_BASE_URL: string;
    AUDIENCE: string;
    MONGO_DB: string;
}

export const appConfig = readConfig<BaseAppConfig>(config_raw);

export const LISTEN_LOCAL_ADDR = () => {
    if (process.env.NODE_ENV === "production") {
        return "127.0.0.1";
    } else {
        return "0.0.0.0";
    }
}