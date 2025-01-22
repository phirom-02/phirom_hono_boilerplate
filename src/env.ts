/* eslint-disable node/no-process-env */
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { z, ZodError } from "zod";

export enum BUN_ENV {
  test = "test",
  development = "development",
  production = "production",
}

expand(
  config({
    path: path.resolve(
      process.cwd(),
      process.env.BUN_ENV === "test" ? ".env.test" : ".env"
    ),
  })
);

const stringToBoolean = z.coerce
  .string()
  .transform((value) => {
    return value === "TRUE";
  })
  .default("FALSE");

const EnvSchema = z
  .object({
    BUN_ENV: z.string().default("development"),
    PORT: z.coerce.number().default(3000),
    LOG_LEVEL: z.enum([
      "fatal",
      "error",
      "warn",
      "info",
      "qdebug",
      "trace",
      "silent",
    ]),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
    DB_MIGRATING: stringToBoolean,
    DB_SEEDING: stringToBoolean,
  })
  .superRefine((input, ctx) => {
    if (input.BUN_ENV === BUN_ENV.production && !input.DATABASE_AUTH_TOKEN) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: "string",
        received: "undefined",
        path: ["DATABASE_AUTH_TOKEN"],
        message: "Must be set when BUN_ENV is 'production'",
      });
    }
  });

type env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line ts/no-redeclare
const { data: env, error } = EnvSchema.safeParse(process.env);

if (error instanceof ZodError) {
  let message = "Missing required values in .env\n";
  error.issues.forEach((issue) => {
    message += `${issue.path[0]}\n`;
  });
  const e = new Error(message);
  throw e;
} else {
  console.error(error);
}

export { env };
export default EnvSchema.safeParse(process.env).data!;
