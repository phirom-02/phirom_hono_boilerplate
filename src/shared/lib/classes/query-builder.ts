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
import env from "@/env";

export default class QueryBuilder<T extends TableSchema, F extends TableField>
  implements IQueryBuilder
{
  private conditions: SQLWrapper[] = [];

  private sortColums: SQL[] = [];

  private limitValue: number = env.MAX_LIMIT;

  private offsetValue: number = 1;

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
        continue;
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

            this.checkInvalidRangesValue(min, max);

            // @ts-expect-error
            this.conditions.push(between(this.table[fieldName], min, max));
            break;
          case "nbetween":
            [min, max] = value.split(",").map(normalizeStringValue);

            this.checkInvalidRangesValue(min, max);

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

      this.sortColums = this.sortColums.concat(
        sortFields
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
          .filter((field) => field !== null)
      );
    } else {
      if ("id" in this.table) {
        this.sortColums.push(desc(this.table["id"]));
      }
    }

    return this;
  }

  paginate() {
    const page = Number(this.queryString?.page || 1);

    const limit = Math.min(
      Number(this.queryString?.limit || 100),
      env.MAX_LIMIT
    );

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

  private checkInvalidRangesValue(minValue: unknown, maxValue?: unknown) {
    // Values cannot be null
    if (minValue === null || maxValue === null) {
      throw new HTTPException(HttpStatusCodes.BAD_REQUEST, {
        message: "Range values cannot be null",
      });
    }

    // Boolean ranges don't make sense
    if (typeof minValue === "boolean" || typeof maxValue === "boolean") {
      throw new HTTPException(HttpStatusCodes.BAD_REQUEST, {
        message: "Boolean values cannot be used in range comparisons",
      });
    }

    // String ranges are not supported
    if (typeof minValue === "string" || typeof maxValue === "string") {
      throw new HTTPException(HttpStatusCodes.BAD_REQUEST, {
        message: "String values cannot be used in range comparisons",
      });
    }

    // Both values must be of the same type
    if (typeof minValue !== typeof maxValue) {
      throw new HTTPException(HttpStatusCodes.BAD_REQUEST, {
        message: "Range values must be of the same type",
      });
    }

    // Handle date ranges
    if (minValue instanceof Date && maxValue instanceof Date) {
      if (minValue.getTime() > maxValue.getTime()) {
        throw new HTTPException(HttpStatusCodes.BAD_REQUEST, {
          message: "Invalid date range: start date must be before end date",
        });
      }
      return;
    }

    // Handle numeric ranges
    if (typeof minValue === "number" && typeof maxValue === "number") {
      if (minValue > maxValue) {
        throw new HTTPException(HttpStatusCodes.BAD_REQUEST, {
          message:
            "Invalid numeric range: first value must be less than second value",
        });
      }
      return;
    }

    throw new HTTPException(HttpStatusCodes.BAD_REQUEST, {
      message: "Invalid range values",
    });
  }
}
