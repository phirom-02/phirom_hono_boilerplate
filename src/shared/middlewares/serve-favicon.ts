import type { MiddlewareHandler } from "hono";

export default function serveFavicon(imagePath: string): MiddlewareHandler {
  return async (c, next) => {
    if (c.req.path === "/favicon.ico") {
      const file = Bun.file(imagePath);
      const favicon = await file.arrayBuffer();
      c.header("Content-Type", "image/svg+xml");
      return c.body(favicon);
    }
    return next();
  };
}
