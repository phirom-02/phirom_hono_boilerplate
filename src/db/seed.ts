import type { Table } from "drizzle-orm";

import * as schema from "@/db/schema";
import { getTableName, sql } from "drizzle-orm";

import env from "@/env";

import type { Db } from ".";

import db from ".";
import * as seeds from "./seeds";

if (!env.DB_SEEDING) {
  throw new Error("You must set DB_SEEDING to 'TRUE' when running seeds");
}

async function resetTable(db: Db, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
  );
}

for (const table of [schema.tasks]) {
  await resetTable(db, table);
}

await seeds.tasks(db);
