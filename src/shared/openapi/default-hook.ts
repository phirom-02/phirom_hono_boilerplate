import type { Hook } from "@hono/zod-openapi";
import { HttpStatusCodes } from "@/shared/constants";

export default function defaultHook(): Hook<any, any, any, any> {
  return (result, c) => {
    if (!result.success) {
      return c.json(
        {
          success: result.success,
          error: result.error,
        },
        HttpStatusCodes.UNPROCESSABLE_ENTITY
      );
    }
  };
}
