import * as path from "path";
import logger from "morgan";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
// import httpProxy from 'http-proxy';
import cors from 'cors'
import type { IConfig } from "./types/IConfigItem";

const app: Express = express();
const endpointConfig: IConfig[] = require("../endpoint.json");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, "../public")));

// var proxy = httpProxy.createProxyServer();
// proxy.on('error', function(err, req, res){
//   res.end();
// });

endpointConfig.forEach((item) => {
  app.use(
    item.path,
    createProxyMiddleware({
      target: item.target,
      pathRewrite: item.rewrite,
    })
  );
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err: any, req: any, res: any, next: any) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: err });
});

export default app;
