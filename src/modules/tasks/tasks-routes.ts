import { Hono } from "hono";

import tasksController from "./tasks-controller";

const router = new Hono();

router
  .use("/")
  .get(tasksController.getTasks)
  .post(tasksController.createTask)
  .use("/:id")
  .get(tasksController.getTaskById)
  .patch(tasksController.updateTask)
  .delete(tasksController.deleteTask);

export default router;
