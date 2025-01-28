import {
  insertTasksSchema,
  selectTasksSchema,
  updateTasksSchema,
} from "@/db/schema/tasks";
import { HttpStatusCodes } from "@/shared/constants";
import { notFoundSchema } from "@/shared/constants/constants";
import { jsonContent, jsonContentRequired } from "@/shared/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "@/shared/openapi/schemas";
import { createRoute, z } from "@hono/zod-openapi";

const tags = ["Tasks"];

const tasksOpenApi = {
  createTask: createRoute({
    path: "/",
    method: "post",
    request: {
      body: jsonContentRequired(insertTasksSchema, "The task payload"),
    },
    tags,
    responses: {
      [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, "The created task"),
      [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
        createErrorSchema(insertTasksSchema),
        "The validation error(s)"
      ),
    },
  }),

  getTasks: createRoute({
    path: "/",
    method: "get",
    tags,
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        z.array(selectTasksSchema),
        "The list of tasks"
      ),
    },
  }),

  getTask: createRoute({
    path: "/{id}",
    method: "get",
    request: {
      params: IdParamsSchema,
    },
    tags,
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        selectTasksSchema,
        "The selected tasks"
      ),
      [HttpStatusCodes.NOT_FOUND]: jsonContent(
        notFoundSchema,
        "Task not found"
      ),
      [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
        createErrorSchema(IdParamsSchema),
        "Invalid id error"
      ),
    },
  }),

  updateTask: createRoute({
    path: "/{id}",
    method: "patch",
    request: {
      params: IdParamsSchema,
      body: jsonContentRequired(updateTasksSchema, "The update task payload"),
    },
    tags,
    responses: {
      [HttpStatusCodes.OK]: jsonContent(selectTasksSchema, "The updated task"),
      [HttpStatusCodes.NOT_FOUND]: jsonContent(
        notFoundSchema,
        "Task not found"
      ),
      [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
        createErrorSchema(updateTasksSchema).or(
          createErrorSchema(IdParamsSchema)
        ),
        "The validation error(s)"
      ),
    },
  }),

  deleteTask: createRoute({
    path: "/{id}",
    method: "delete",
    request: {
      params: IdParamsSchema,
    },
    tags,
    responses: {
      [HttpStatusCodes.NO_CONTENT]: {
        description: "Task deleted",
      },
      [HttpStatusCodes.NOT_FOUND]: jsonContent(
        notFoundSchema,
        "Task not found"
      ),
      [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
        createErrorSchema(IdParamsSchema),
        "Invalid id error"
      ),
    },
  }),
};

export default tasksOpenApi;

type TasksOpenApi = typeof tasksOpenApi;
export type GetTasksRoute = TasksOpenApi["getTasks"];
export type GetTaskRoute = TasksOpenApi["getTask"];
export type CreateTaskRoute = TasksOpenApi["createTask"];
export type UpdateTaskRoute = TasksOpenApi["updateTask"];
export type DeleteTaskRoute = TasksOpenApi["deleteTask"];
