import { Elysia } from "elysia";

// Define a plugin

export const plugin = new Elysia()
    .state("plugin-version", 1)
    .get("/form-plugin", () => "Hello")
    .get("/greet", () => "Hi, Developer!")