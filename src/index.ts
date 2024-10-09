import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Food-server")
    .get("/post/:id", ({params: {id}}) => {return{id: id, title: "Bun"}})
    .state("version", 1)
    .decorate('getDate', () => Date.now())
    .post("/post", ({body, set}) => {
        set.status = 201
        return body})
    .get("/track/*/", () => {return "Track route"})
    .get("/foods", ({store, getDate}) => {
        console.log(store)
        console.log(getDate())
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
    .listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
