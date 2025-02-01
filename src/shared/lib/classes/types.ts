import { SQLWrapper } from "drizzle-orm";

export type GetQueriesReturns = {
  filter: SQLWrapper[];
};

export interface IQueryBuilder {
  filter(): void;
  getQueries(): GetQueriesReturns;
}
