import { z } from "@hono/zod-openapi";
import { ZodSchema } from "../helpers/types";

export const meta = z.object({
  timestamp: z.string().datetime(),
});

export const response = (dataSchema: ZodSchema) =>
  z.object({
    meta: meta,
    data: dataSchema,
  });

export const responsePagination = (dataSchema: ZodSchema) =>
  z.object({
    meta: meta,
    data: dataSchema,
    pagination: z.object({
      isEmpty: z.boolean().default(false),
      isFirstPage: z.boolean().default(true),
      isLastPage: z.boolean().default(false),
      limit: z.number().default(100),
      elementCount: z.number().default(1),
      page: z.number().default(1),
      totalPages: z.number().default(1),
      totalElements: z.number().default(1),
    }),
  });
