import {Elysia} from "elysia";
import foodRoutes from "./routes/food";
import userRoutes from "./routes/user";
import path from 'node:path';
import {glob} from 'glob';
const dotEnv = await Bun.file('.env')


try {
    if (!(await dotEnv.exists())) throw new Error('No .env found')
} catch (error) {
    console.error(error)
}

// TODO: Group Route - Resolve!

export default async function groupRouter(app: InstanceType<typeof Elysia>, groupsDir = 'routes') {
    const groupsPath = path.join(path.dirname(Bun.main), groupsDir);
    const files = await glob('**/index.ts', {cwd: groupsPath, absolute: true});

    for (const file of files) {
        console.log("Importing routes from:", file);
        const {default: group} = await import(file);
        const folderName = path.dirname(file).replace(groupsPath, '');
        const {default: routes} = await import(file);
        app.group(`/${folderName}`, (api: InstanceType<typeof Elysia>) => {
            api.use(routes);
        });
    }

    return app;
}

//Application

const app = new Elysia()

app
    .get('/',() => "Hello Food!")
    .group('/api', (app: InstanceType<typeof Elysia>) => app.use(foodRoutes))
    .group('/users', (app: InstanceType<typeof Elysia>) => app.use(userRoutes))
    .listen(process.env.PORT  || 5000)


console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

