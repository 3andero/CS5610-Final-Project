import express from "express";
import jwksRsa from "jwks-rsa";
import { appConfig } from "../config";
export const router_cart = express.Router();
import { logStr } from "../utils";
import { expressjwt as jwt } from "express-jwt";
import { cart_create, cart_delete, cart_get } from "../controllers/shoppingCartController";

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

router_cart.post("/", checkJWT, cart_create);

router_cart.get("/", checkJWT, cart_get);

router_cart.delete("/", checkJWT, cart_delete);
