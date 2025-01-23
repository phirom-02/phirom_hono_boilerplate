import { Hono } from "hono";

import tasksRoute from "@/modules/tasks/tasks-routes";

const router = new Hono();

const routes = [
  {
    path: "/tasks",
    route: tasksRoute,
  },
];

routes.forEach((el) => {
  router.route(el.path, el.route);
});

export default router;
