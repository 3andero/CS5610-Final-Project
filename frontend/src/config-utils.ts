
export type AppConfigVal<T> = {
    prod: T;
    dev: T;
} | T;

export type Transform<K> = {
    [P in keyof K]: AppConfigVal<K[P]>;
};


export const readConfig = <BaseConf,>(conf_json: Transform<BaseConf>): BaseConf => {
    const appConfig1 = conf_json as any;
    Object.keys(appConfig1).forEach(k => {
        if (typeof appConfig1[k] === "object") {
            appConfig1[k] = appConfig1[k][process.env.NODE_ENV === "production" ? "prod" : "dev"];
        }
    })
    return appConfig1 as BaseConf;
}