import express from "express";
import { appConfig } from "./src/config";
import morgan from "morgan";
import helmet from "helmet";
import { join } from 'path';
import { logStr } from "./src/utils";

const App = express();
App.use(morgan('dev'));
App.use(helmet({
    contentSecurityPolicy: false,
}));

const static_website = logStr(join(__dirname, 'frontend/build'));
App.use(express.static(static_website));

App.listen(appConfig.APP_PORT);