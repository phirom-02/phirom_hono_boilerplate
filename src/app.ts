import { Hono } from "hono";

import routes from "./routes";
import { pinoLogger } from "./shared/middlewares/pino-logger";

const app = new Hono();

app.use(pinoLogger());

app.route("/api", routes);

export default app;
