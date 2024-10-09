import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Food-server")
    .get("/post/:id", ({params: {id}}) => {return{id: id, title: "Bun"}})
    .post("/post", (context) => {return context})
    .get("/track/*/", () => {return "Track route"})
    .listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
