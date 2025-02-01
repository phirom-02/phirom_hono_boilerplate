import { and, eq, sql } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";

import type { CreateTaskPayload, UpdateTaskPayload } from "@/db/schema/tasks";

import db from "@/db";
import tasks from "@/db/schema/tasks";
import {
  HttpStatusCodes,
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

    return await query;
  },

  async getTaskById(id: number) {
    const task = await db.query.tasks.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, id);
      },
    });

    if (!task) {
      throw new HTTPException(HttpStatusCodes.NOT_FOUND, {
        message: "Task not found",
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
        message: "Task not found",
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
        message: "Task not found",
      });
    }
  },
};

export default tasksService;
