import { z } from "@hono/zod-openapi";

const slugReg = /^[\w-]+$/;
const SLUG_ERROR_MESSAGE =
  "Slug can only contain letters, numbers, dashes, and underscores";

const SlugParamsSchema = z.object({
  slug: z
    .string()
    .regex(slugReg, SLUG_ERROR_MESSAGE)
    .openapi({
      param: {
        name: "slug",
        in: "path",
        required: true,
        schema: { nullable: false },
      },
      required: ["slug"],
      example: "my-cool-article",
    }),
});

export default SlugParamsSchema;
