import { eq } from "drizzle-orm";

import db from "@/db";
import { CreateTaskPayload, UpdateTaskPayload } from "@/db/schema/tasks";
import tasks from "@/db/schema/tasks";

const tasksService = {
  async createTask(createTaskPayload: CreateTaskPayload) {
    const newTask = await db
      .insert(tasks)
      .values(createTaskPayload)
      .returning();

    return newTask[0];
  },

  async getTasks() {
    const _tasks = await db.select().from(tasks);
    return _tasks;
  },

  async getTaskById(id: number) {
    const _task = await db.select().from(tasks).where(eq(tasks.id, id));
    return _task[0];
  },

  async updateTask(id: number, updateTaskPayload: UpdateTaskPayload) {
    const _task = await db
      .update(tasks)
      .set(updateTaskPayload)
      .where(eq(tasks.id, id))
      .returning();
    return _task[0];
  },

  async deleteTask(id: number) {
    await db.delete(tasks).where(eq(tasks.id, id));
    return true;
  },
};

export default tasksService;
