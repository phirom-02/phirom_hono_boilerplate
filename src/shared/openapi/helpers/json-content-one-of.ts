import oneOf from "./one-of";
import type { ZodSchema } from "./types";

export default function jsonContentOneOf<T extends ZodSchema>(
  schemas: T[],
  description: string
) {
  return {
    content: {
      "application/json": {
        schema: {
          oneOf: oneOf(schemas),
        },
      },
    },
    description,
  };
}
