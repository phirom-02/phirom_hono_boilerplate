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
import { UpdateTaskPayload } from "@/db/schema/tasks";

type TasksController = {
  getTasks: AppRouteHandler<GetTasksRoute>;

  getTaskById: AppRouteHandler<GetTaskRoute>;

  createTask: AppRouteHandler<CreateTaskRoute>;

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
    const tasks = await tasksService.getTasks();
    return c.json(tasks, HttpStatusCodes.OK);
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

    // @ts-expect-error
    return c.json(null, HttpStatusCodes.NO_CONTENT);
  },
};

export default tasksController;
