import type { NotFoundHandler } from "hono";

import { HttpStatusCodes, HttpStatusPhrases } from "../constants";

export default function notFoundHandler(): NotFoundHandler {
  return async (c) => {
    const message = `${HttpStatusPhrases.NOT_FOUND} - ${c.req.path}`;
    return c.json({ message }, HttpStatusCodes.NOT_FOUND);
  };
}
