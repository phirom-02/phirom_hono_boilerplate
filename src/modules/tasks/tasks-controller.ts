import tasksService from "./tasks-service";
import {
  CreateTaskRoute,
  DeleteTaskRoute,
  GetTaskRoute,
  GetTasksRoute,
  UpdateTaskRoute,
} from "./tasks-openapi";

import { AppRouteHandler } from "@/shared/lib/types";
import { HttpStatusCodes } from "@/shared/constants";
import tasks, { UpdateTaskPayload } from "@/db/schema/tasks";
import { QueryBuilder } from "@/shared/lib";
import { ContentfulStatusCode } from "hono/utils/http-status";

type TasksController = {
  createTask: AppRouteHandler<CreateTaskRoute>;

  getTasks: AppRouteHandler<GetTasksRoute>;

  getTaskById: AppRouteHandler<GetTaskRoute>;

  updateTask: AppRouteHandler<UpdateTaskRoute>;

  deleteTask: AppRouteHandler<DeleteTaskRoute>;
};

const tasksController: TasksController = {
  async createTask(c) {
    const createTaskPayload = c.req.valid("json");
    const newTask = await tasksService.createTask(createTaskPayload);

    return c.json(newTask, HttpStatusCodes.OK);
  },

  async getTasks(c) {
    const queryString = c.req.query();

    const queries = new QueryBuilder(queryString, tasks)
      .filter()
      .sort()
      .paginate()
      .getQueries();

    const result = await tasksService.getTasks(queries);

    return c.json(
      {
        meta: {
          timestamp: new Date().toISOString(),
        },
        ...result,
      },
      HttpStatusCodes.OK
    );
  },

  async getTaskById(c) {
    const { id } = c.req.valid("param");
    const task = await tasksService.getTaskById(id);

    return c.json(task, HttpStatusCodes.OK);
  },

  async updateTask(c) {
    const { id } = c.req.valid("param");
    const updateTaskPayload: UpdateTaskPayload = await c.req.json();
    const updatedTask = await tasksService.updateTask(id, updateTaskPayload);

    return c.json(updatedTask, HttpStatusCodes.OK);
  },

  async deleteTask(c) {
    const { id } = c.req.valid("param");

    await tasksService.deleteTask(id);

    return c.json(null, HttpStatusCodes.NO_CONTENT as ContentfulStatusCode);
  },
};

export default tasksController;
