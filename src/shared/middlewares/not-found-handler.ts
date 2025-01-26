import type { NotFoundHandler } from "hono";

import HttpStatusCode from "../enums/http-status-codes";
import HttpStatusPhrase from "../enums/http-status-phrase";

export default function notFoundHandler(): NotFoundHandler {
  return async (c) => {
    const message = `${HttpStatusPhrase.NOT_FOUND} - ${c.req.path}`;
    return c.json({ message }, HttpStatusCode.NOT_FOUND);
  };
}
