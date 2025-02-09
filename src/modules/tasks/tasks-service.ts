import { and, eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";

import type { CreateTaskPayload, UpdateTaskPayload } from "@/db/schema/tasks";

import db from "@/db";
import tasks from "@/db/schema/tasks";
import {
  HttpStatusCodes,
  HttpStatusPhrases,
  ZOD_ERROR_CODES,
  ZOD_ERROR_MESSAGES,
} from "@/shared/constants";
import { GetQueriesReturns } from "@/shared/lib/classes/types";

const tasksService = {
  async createTask(createTaskPayload: CreateTaskPayload) {
    const newTask = await db
      .insert(tasks)
      .values(createTaskPayload)
      .returning();

    return newTask[0];
  },

  async getTasks(queries: GetQueriesReturns) {
    let query = db.select().from(tasks);
    if (queries.filter.length) {
      // @ts-expect-error
      query = query.where(and(...queries.filter));
    }
    if (queries.sortColumns.length) {
      // @ts-expect-error
      query = query.orderBy(...queries.sortColumns);
    }

    if (queries.filter.length) {
      // @ts-expect-error
      query = query.where(and(...queries.filter));
    }

    const totalElements = (await query).length;

    if (queries.limitValue !== null) {
      // @ts-expect-error
      query = query.limit(queries.limitValue);
    }
    if (queries.offsetValue !== null) {
      // @ts-expect-error
      query = query.offset(queries.offsetValue);
    }

    const data = await query;

    const isEmpty = data.length === 0;

    const totalPages = Math.ceil(totalElements / queries.limitValue);

    const page = Math.floor(queries.offsetValue / queries.limitValue) + 1;

    const isFirstPage = page === 1;

    const isLastPage = page === totalPages;

    const limit = queries.limitValue;

    const elementCount = data.length;

    return {
      data,
      pagination: {
        isEmpty,
        isFirstPage,
        isLastPage,
        limit,
        elementCount,
        page,
        totalPages,
        totalElements,
      },
    };
  },

  async getTaskById(id: number) {
    const task = await db.query.tasks.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, id);
      },
    });

    if (!task) {
      throw new HTTPException(HttpStatusCodes.NOT_FOUND, {
        message: HttpStatusPhrases.NOT_FOUND,
      });
    }

    return task;
  },

  async updateTask(id: number, updateTaskPayload: UpdateTaskPayload) {
    if (!Object.keys(updateTaskPayload).length) {
      throw new HTTPException(HttpStatusCodes.UNPROCESSABLE_ENTITY, {
        cause: {
          issues: [
            {
              code: ZOD_ERROR_CODES.INVALID_UPDATES,
              path: [],
              message: ZOD_ERROR_MESSAGES.NO_UPDATES,
            },
          ],
          name: "ZodError",
        },
      });
    }

    const [task] = await db
      .update(tasks)
      .set(updateTaskPayload)
      .where(eq(tasks.id, id))
      .returning();

    if (!task) {
      throw new HTTPException(HttpStatusCodes.NOT_FOUND, {
        message: HttpStatusPhrases.NOT_FOUND,
      });
    }

    return task;
  },

  async deleteTask(id: number) {
    const [deletedTask] = await db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();

    if (!deletedTask) {
      throw new HTTPException(HttpStatusCodes.NOT_FOUND, {
        message: HttpStatusPhrases.NOT_FOUND,
      });
    }
  },
};

export default tasksService;
