import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Food-server")
    .get("/post/:id", ({params: {id}}) => {return{id: id, title: "Bun"}})
    .listen(5000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
