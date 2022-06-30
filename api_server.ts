"use strict";

/**
 * API server
 */

import express, { ErrorRequestHandler } from "express";
import { appConfig, LISTEN_LOCAL_ADDR } from "./src/config";
import { ApiError, connectToMongoDB, fetchCurrencyExchangeRateTask, logStr } from "./src/utils";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
import { mongoose } from "@typegoose/typegoose";
import { ProductModel, Product } from "./src/models/product";
import { OrderModel, Order } from "./src/models/order";
import { router_Index } from "./src/routes";
import { router_Products } from "./src/routes/products";
import { router_user } from "./src/routes/user";
import { router_cart } from "./src/routes/shoppingCart";
import { router_order } from "./src/routes/order";
import { searchRouter } from "./src/routes/search";
import { currency } from "./src/routes/currencyExchange";

// const appOrigin = logStr(appConfig.APP_ORIGIN || `http://localhost:3000`);

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));
process.env.NODE_ENV !== "production" && app.use(cors({ origin: "*" }));
app.use(helmet());

app.use("/", router_Index);
app.use("/products", router_Products);
app.use("/user", router_user);
app.use("/shopping-cart", router_cart);
app.use("/order", router_order);
app.use("/search", searchRouter);
app.use("/currency", currency);

const jwksURI = logStr(
  appConfig.ISSUER_BASE_URL +
  (appConfig.ISSUER_BASE_URL.slice(-1) === "/" ? "" : "/") +
  ".well-known/jwks.json"
);

const checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: jwksURI,
  }) as jwksRsa.GetVerificationKey,
  audience: logStr(appConfig.AUDIENCE),
  issuer: logStr(appConfig.ISSUER_BASE_URL + "/"),
  algorithms: ["RS256"],
});

app.get("/v1/protected/", checkJWT, (req, res, next) => {
  res.send({ msg: "protected routes" });
});

app.use((_req, _res, next) => {
  next(new ApiError(404, "Not found"));
});

app.use(((err, req, res, next) => {
  console.log(`error: ${err}`);
  if (!res.headersSent) {
    if (err.status) {
      res.status(err.status);
      res.send(`${err.status} ${err.message}`);
    } else {
      res.status(500);
      res.send(`${err}`);
    }
  }
}) as ErrorRequestHandler);

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(appConfig.MONGO_DB);
    await connectToMongoDB();
    await fetchCurrencyExchangeRateTask();
    app.listen(appConfig.API_PORT, LISTEN_LOCAL_ADDR(), () => {
      console.log(`Server started on port ${LISTEN_LOCAL_ADDR()}:${appConfig.API_PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
