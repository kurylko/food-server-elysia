import {t} from "elysia";

export const loginDTO= t.Object({
    username: t.String(),
    password: t.String()
})