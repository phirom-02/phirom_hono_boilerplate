import tasksRoute from "@/modules/tasks/tasks-routes";
import { createApp, createRouter } from "./shared/lib";

const router = createApp();

const routes = [
  {
    path: "/tasks",
    route: tasksRoute,
  },
];

routes.forEach((el) => {
  router.route(el.path, el.route);
});

export type AppType = (typeof routes)[number];

export default router;
