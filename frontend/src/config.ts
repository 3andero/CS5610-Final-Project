import conf_json from "./.env.json";
import { readConfig } from "./config-utils";

interface BaseAppConfig {
    CLIENT_ID: string;
    ISSUER_BASE_URL: string;
    AUDIENCE: string;
    API_SERVER_DOMAIN: string;
}

export const appConfig = readConfig<BaseAppConfig>(conf_json);