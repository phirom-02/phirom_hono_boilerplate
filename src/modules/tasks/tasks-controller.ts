import { Context } from "hono";
import tasksService from "./tasks-service";

const tasksController = {
  async createTask(c: Context) {
    const payload = await c.req.json();
    const task = await tasksService.createTask(payload);
    return c.json({
      data: task,
    });
  },

  async getTasks(c: Context) {
    const tasks = await tasksService.getTasks();
    return c.json({
      data: tasks,
    });
  },

  async getTaskById(c: Context) {
    const { id } = c.req.param();
    const task = await tasksService.getTaskById(parseInt(id));
    return c.json({
      data: task,
    });
  },

  async updateTask(c: Context) {
    const payload = await c.req.json();
    const { id } = c.req.param();

    const task = await tasksService.updateTask(parseInt(id), payload);
    return c.json({
      data: task,
    });
  },

  async deleteTask(c: Context) {
    const { id } = c.req.param();

    await tasksService.deleteTask(parseInt(id));
    return c.json({
      data: true,
    });
  },
};

export default tasksController;
