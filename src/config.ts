import config_raw from "../.env.json";

interface AppConfig {
    APP_PORT: number;
    API_PORT: number;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    ISSUER_BASE_URL: string;
    APP_ORIGIN?: string;
    AUDIENCE: string;
    MONGO_DB: string;
    LISTEN_LOCAL_ADDR?: "0.0.0.0" | "127.0.0.1";
}

export const appConfig: AppConfig = config_raw;

if (process.env.NODE_ENV === "production") {
    appConfig.LISTEN_LOCAL_ADDR = "127.0.0.1";
} else {
    appConfig.LISTEN_LOCAL_ADDR = "0.0.0.0";
}