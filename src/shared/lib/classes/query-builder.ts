import {
  asc,
  between,
  desc,
  eq,
  gt,
  gte,
  inArray,
  isNotNull,
  isNull,
  like,
  lt,
  lte,
  ne,
  notBetween,
  notInArray,
  notLike,
  SQL,
  SQLWrapper,
} from "drizzle-orm";
import { IQueryBuilder } from "./types";
import { normalizeStringValue } from "@/shared/utils/fData";
import { HTTPException } from "hono/http-exception";
import { HttpStatusCodes } from "@/shared/constants";
import { TableField, TableSchema } from "@/db/types";

export default class QueryBuilder<T extends TableSchema, F extends TableField>
  implements IQueryBuilder
{
  private conditions: SQLWrapper[] = [];

  private sortColums: SQL[] = [];

  private limitValue: number | null = null;

  private offsetValue: number | null = null;

  constructor(
    private queryString: Record<string, string>,
    private table: T
  ) {}

  filter() {
    const queryObject = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit", "fields"];

    excludedFields.forEach((el) => delete queryObject[el]);

    for (const [key, value] of Object.entries(queryObject)) {
      const fieldName = key.split("_")[0] as F;

      // Skip if field name not in table schema
      if (!(fieldName in this.table) || !value) {
        throw new HTTPException(HttpStatusCodes.BAD_REQUEST, {
          message: "Provide appropriate filtering value",
        });
      }

      // Handle operator queries (gte, lte, gt, lt, like, nlike, in, nin, ne)
      const matches = key.match(
        /(.+)_(gte|gt|lte|lt|like|nlike|in|nin|ne|between|nbetween|null)$/
      );

      if (matches) {
        const [, fieldName, operator] = matches;

        let min, max;

        switch (operator) {
          case "gte":
            this.conditions.push(
              // @ts-expect-error
              gte(this.table[fieldName], normalizeStringValue(value))
            );
            break;
          case "gt":
            this.conditions.push(
              // @ts-expect-error
              gt(this.table[fieldName], normalizeStringValue(value))
            );
            break;
          case "lte":
            this.conditions.push(
              // @ts-expect-error
              lte(this.table[fieldName], normalizeStringValue(value))
            );
            break;
          case "lt":
            this.conditions.push(
              // @ts-expect-error
              lt(this.table[fieldName], normalizeStringValue(value))
            );
            break;
          case "like":
            this.conditions.push(
              // @ts-expect-error
              like(this.table[fieldName], normalizeStringValue(value))
            );
            break;
          case "nlike":
            this.conditions.push(
              // @ts-expect-error
              notLike(this.table[fieldName], normalizeStringValue(value))
            );
            break;
          case "null":
            const normalizedIsNullValue = normalizeStringValue(value);
            this.conditions.push(
              normalizedIsNullValue
                ? // @ts-expect-error
                  isNull(this.table[fieldName])
                : // @ts-expect-error
                  isNotNull(this.table[fieldName])
            );
            break;
          case "ne":
            this.conditions.push(
              // @ts-expect-error
              ne(this.table[fieldName], normalizeStringValue(value))
            );
            break;
          case "between":
            [min, max] = value.split(",").map(normalizeStringValue);
            // @ts-expect-error
            this.conditions.push(between(this.table[fieldName], min, max));
            break;
          case "nbetween":
            [min, max] = value.split(",").map(normalizeStringValue);
            // @ts-expect-error
            this.conditions.push(notBetween(this.table[fieldName], min, max));
            break;
          case "in":
            const inValues = value.split(",").map(normalizeStringValue);
            // @ts-expect-error
            this.conditions.push(inArray(this.table[fieldName], inValues));
            break;
          case "nin":
            const notInValues = value.split(",").map(normalizeStringValue);
            this.conditions.push(
              // @ts-expect-error
              notInArray(this.table[fieldName], notInValues)
            );
            break;
          default:
            break;
        }
      } else {
        // @ts-expect-error
        this.conditions.push(eq(this.table[key], normalizeStringValue(value)));
      }
    }

    return this;
  }

  sort() {
    if (this.queryString?.sort) {
      const sortFields = this.queryString.sort
        .split(",")
        .map((field) => field.trim());

      this.sortColums = sortFields
        .map((field) => {
          const isDescending = field.startsWith("-");

          const fieldName = isDescending ? field.substring(1) : field;

          if (fieldName in this.table) {
            return isDescending
              ? //@ts-expect-error
                desc(this.table[fieldName])
              : //@ts-expect-error
                asc(this.table[fieldName]);
          }

          return null;
        })
        .filter((field) => field !== null);
    } else {
      if ("id" in this.table) {
        this.sortColums = [desc(this.table["id"])];
      }
    }

    return this;
  }

  paginate() {
    const page = Number(this.queryString?.page || 1);

    const limit = Number(this.queryString?.limit || 100);

    const offset = (page - 1) * limit;

    this.limitValue = limit;

    this.offsetValue = offset;

    return this;
  }

  getQueries() {
    return {
      filter: this.conditions,
      sortColumns: this.sortColums,
      limitValue: this.limitValue,
      offsetValue: this.offsetValue,
    };
  }
}
