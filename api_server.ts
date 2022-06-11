'use strict';

/**
 * API server
 */

import express, { ErrorRequestHandler } from 'express';
import { appConfig } from './src/config';
import { ApiError, logStr } from './src/utils';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const appOrigin = logStr(appConfig.APP_ORIGIN || `http://localhost:3000`);

const app = express();

app.use(morgan('dev'));

app.use(helmet());
app.use(cors({ origin: appOrigin }));

const jwksURI = logStr(appConfig.ISSUER_BASE_URL + (appConfig.ISSUER_BASE_URL.slice(-1) === '/' ? '' : '/') + ".well-known/jwks.json");

const checkJWT = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: jwksURI,
    }),
    audience: logStr(appConfig.AUDIENCE),
    issuer: logStr(appConfig.ISSUER_BASE_URL + '/'),
    algorithms: ["RS256"],
});

app.get("/", (req, res, next) => {
    res.send("hello world");
});

app.get("/v1/protected/", checkJWT, (req, res, next) => {
    res.send({ msg: "protected routes" });
});

app.use((_req, _res, next) => {
    next(new ApiError(404, 'Not found'));
});

app.use(((err, req, res, next) => {
    console.log("error");
    res.status(err.status || 500);
    if (!res.headersSent) {
        res.send(`${err.status} ${err.message}`);
    }
}) as ErrorRequestHandler);

app.listen(appConfig.API_PORT);