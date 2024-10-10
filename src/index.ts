import {Elysia} from "elysia";
import foodRoutes from "./routes/food";



//Application

const app = new Elysia()

app
    .group('/api', (app: InstanceType<typeof Elysia>) => app.use(foodRoutes))
    .listen(process.env.PORT  || 5000)


console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

