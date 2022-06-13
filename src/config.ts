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
}

export const appConfig: AppConfig = config_raw;