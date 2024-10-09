import {Elysia, t} from "elysia";
import {plugin} from "./plugin";
import {loginDTO} from "./models";


//Application

const app = new Elysia().get("/", () => "Hello Food-server")
    .get("/post/:id", ({params: {id}}) => {
        return {id: id, title: "Bun"}
    })
    .use(plugin)
    .state("version", 1)
    .decorate('getDate', () => Date.now())
    .post("/post", ({body, set}) => {
        set.status = 201
        return body
    })
    .get("/track/*/", () => {
        return "Track route"
    })
    .get("/foods", ({store, getDate}) => {
        console.log(store)
        console.log(getDate())
        console.log(store ["plugin-version"])
        return new Response(JSON.stringify({
            "foods": [
                "Apple",
                "Banana",
                "Milk"
            ]
        }), {
            headers: {
                "Content-Type": "application/json"
            }
        })
    })
app.group("/user", app => app
    .post("/sing-up", () => "Signup Route")
    .post("/log-in", ({body}) => body, {
        body: loginDTO,
        response: loginDTO
    })
    .get("/:id", () => "User by id Route")
)

    .listen(5000);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

