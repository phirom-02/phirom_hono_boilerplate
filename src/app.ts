import routes from "./routes";
import { configureOpenApi } from "./shared/lib";
import createApp from "./shared/lib/create-app";

const app = createApp();

configureOpenApi(app);

app.route("/api", routes);

export default app;
