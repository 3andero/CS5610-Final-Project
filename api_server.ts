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
import { mongoose } from '@typegoose/typegoose';
import { config } from 'dotenv';
import { ProductModel, Product } from './src/models/product';
import { OrderModel, Order } from './src/models/order';
import { router_Index } from './src/routes';
import { router_Products } from './src/routes/products';

const appOrigin = logStr(appConfig.APP_ORIGIN || `http://localhost:3000`);

const app = express();

app.use(morgan('dev'));

app.use(helmet());
app.use(cors({ origin: appOrigin }));

app.use("/", router_Index);
app.use("/products", router_Products);


const jwksURI = logStr(appConfig.ISSUER_BASE_URL + (appConfig.ISSUER_BASE_URL.slice(-1) === '/' ? '' : '/') + ".well-known/jwks.json");

const checkJWT = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: jwksURI,
    }) as jwksRsa.GetVerificationKey,
    audience: logStr(appConfig.AUDIENCE),
    issuer: logStr(appConfig.ISSUER_BASE_URL + '/'),
    algorithms: ["RS256"],
});

// app.get("/", (req, res, next) => {
//     res.send("hello world");
// });

// app.get("/v1/protected/", checkJWT, (req, res, next) => {
//     res.send({ msg: "protected routes" });
// });

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

const start = async (): Promise<void> => {
    try {
      await mongoose.connect(
        appConfig.MONGO_DB
      );
      app.listen(appConfig.API_PORT, () => {
        console.log("Server started on port 3000");
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };

  void start();