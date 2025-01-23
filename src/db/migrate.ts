import { migrate } from "drizzle-orm/postgres-js/migrator";

import db, { connection } from "@/db";
import env from "@/env";
import config from "$/drizzle.config";

if (!env.DB_MIGRATING) {
  throw new Error(
    "You must set DB_MIGRATING to 'TRUE' when running migrations",
  );
}

await migrate(db, { migrationsFolder: config.out! });

await connection.end();
