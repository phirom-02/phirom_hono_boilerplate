import { OpenAPIHono } from "@hono/zod-openapi";

import {
  errorHandler,
  notFoundHandler,
  pinoLogger,
  serveFavicon,
} from "@/shared/middlewares";

import type { AppBindings, AppOpenAPI } from "./types";
import { defaultHook } from "../openapi";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();

  app.use(pinoLogger());

  app.notFound(notFoundHandler());

  app.use(serveFavicon("public/favicon.ico"));

  app.onError(errorHandler());

  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route("/", router);
}
