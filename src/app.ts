import { Hono } from "hono";

import routes from "./routes";
import {
  notFoundHandler,
  pinoLogger,
  serveFavicon,
} from "./shared/middlewares";

const app = new Hono();

app.use(pinoLogger());

app.notFound(notFoundHandler());

app.use(serveFavicon("public/favicon.ico"));

app.route("/api", routes);

export default app;
