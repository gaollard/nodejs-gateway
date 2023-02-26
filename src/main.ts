import "reflect-metadata";
import http from "http";
import debugFactory from "debug";
import app from "./app";
import "./utils/constant";
import { normalizePort } from "./utils/normalizePort";

const debug = debugFactory("node-im-express-ts:server");
const port = normalizePort(process.env.PORT || "3000");
const server = http.createServer(app);

async function bootstrap() {
  app.set("port", port);
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
}

bootstrap();

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  debug("Listening on " + bind);
}
