import express from "express";
import jwksRsa from "jwks-rsa";
import { appConfig } from "../config";
export const router_order = express.Router();
import { logStr } from "../utils";
import { expressjwt as jwt } from "express-jwt";
import { order_get, order_post } from "../controllers/orderController";

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

router_order.post("/", checkJWT, order_post);

router_order.get("/", checkJWT, order_get);
