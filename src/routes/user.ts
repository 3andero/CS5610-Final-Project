import express from "express";
import jwksRsa from "jwks-rsa";
import { appConfig } from "../config";
export const router_user = express.Router();
import { user_get, user_create, user_patch } from "../controllers/userController";
import { logStr } from "../utils";
import { expressjwt as jwt } from "express-jwt";

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

router_user.get("/", checkJWT, user_get);

router_user.post("/", checkJWT, user_create);

router_user.put("/", checkJWT, user_patch);
