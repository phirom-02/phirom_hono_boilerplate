import { SQL, SQLWrapper } from "drizzle-orm";

export type GetQueriesReturns = {
  filter: SQLWrapper[];
  sortColumns: SQL[];
};

export interface IQueryBuilder {
  filter(): void;
  getQueries(): GetQueriesReturns;
}
