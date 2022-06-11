import conf_json from "./.env.json";

interface AppConfig {
    CLIENT_ID: string;
    ISSUER_BASE_URL: string;
    APP_ORIGIN?: string;
    AUDIENCE: string;
    SERVER_DOMAIN: string;
    API_PORT: number;
}

export const appConfig: AppConfig = conf_json;