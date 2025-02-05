import { SQL, SQLWrapper } from "drizzle-orm";

export type GetQueriesReturns = {
  filter: SQLWrapper[];
  sortColumns: SQL[];
  limitValue: number;
  offsetValue: number;
};

export interface IQueryBuilder {
  filter(): void;
  getQueries(): GetQueriesReturns;
}
