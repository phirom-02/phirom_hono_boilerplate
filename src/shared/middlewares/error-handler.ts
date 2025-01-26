import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode, StatusCode } from "hono/utils/http-status";

import HttpStatusCode from "../enums/http-status-codes.js";

export default function errorHandler(): ErrorHandler {
  return (err, c) => {
    const currentStatus =
      "status" in err ? err.status : c.newResponse(null).status;
    const statusCode =
      currentStatus !== HttpStatusCode.OK
        ? (currentStatus as StatusCode)
        : HttpStatusCode.INTERNAL_SERVER_ERROR;
    // eslint-disable-next-line node/no-process-env
    const env = c.env?.BUN_ENV || process.env?.BUN_ENV;
    return c.json(
      {
        message: err.message,
        stack: env === "production" ? undefined : err.stack,
      },
      statusCode as ContentfulStatusCode
    );
  };
}
