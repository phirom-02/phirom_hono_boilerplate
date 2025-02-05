import * as schema from "./schema";

export type TableSchema = (typeof schema)[keyof typeof schema];
export type TableField = keyof TableSchema;
