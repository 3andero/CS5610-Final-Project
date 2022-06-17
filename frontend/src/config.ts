import conf_json from "./.env.json";

interface AppConfig {
    CLIENT_ID: string;
    ISSUER_BASE_URL: string;
    APP_ORIGIN?: string;
    AUDIENCE: string;
    SERVER_DOMAIN: string;
    API_SERVER_DOMAIN: string;
    API_PORT: number;
    API_URL?: string;
}

export const appConfig: AppConfig = conf_json;

if (process.env.NODE_ENV === "production") {
    appConfig.API_URL = `${appConfig.API_SERVER_DOMAIN}/`;
} else {
    appConfig.API_URL = `${appConfig.SERVER_DOMAIN}:${appConfig.API_PORT}/`;
}