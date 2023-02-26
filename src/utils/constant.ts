import * as fs from "fs";

const appRoot = require("app-root-path");
const isPrd = process.env.APP_ENV === "live";
const configPath = `${appRoot.path}/${process.env.APP_ENV}.config.json`;

if (!fs.existsSync(configPath)) {
  throw Error(`make sure ${configPath} exist`);
}

const config = require(configPath);

export { config, isPrd }

console.log(`current env:`, config);
