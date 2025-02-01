import { SQL, SQLWrapper } from "drizzle-orm";

export type GetQueriesReturns = {
  filter: SQLWrapper[];
  sortColumns: SQL[];
  limitValue: number | null;
  offsetValue: number | null;
};

export interface IQueryBuilder {
  filter(): void;
  getQueries(): GetQueriesReturns;
}
