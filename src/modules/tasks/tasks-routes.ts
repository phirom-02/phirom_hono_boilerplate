import tasksController from "./tasks-controller";
import tasksOpenApi from "./tasks-openapi";
import { createRouter } from "@/shared/lib";

const router = createRouter()
  .openapi(tasksOpenApi.getTasks, tasksController.getTasks)
  .openapi(tasksOpenApi.getTask, tasksController.getTaskById)
  .openapi(tasksOpenApi.createTask, tasksController.createTask)
  .openapi(tasksOpenApi.updateTask, tasksController.updateTask)
  .openapi(tasksOpenApi.deleteTask, tasksController.deleteTask);

export default router;
