import {Elysia, t} from "elysia";
import {createUser, deleteUser, getUser, getUsers} from "./handlers";


const CreateUserBody = t.Object({
    email: t.String(),
    name: t.String({
        minLength: 2,
        maxLength: 50,
    }),
    password: t.String(),
});

type CreateUserBodyType = typeof CreateUserBody['_type'];

const userRoutes = new Elysia()
    .get("/", () => getUsers())
    .get("/:id", ({params}: {params: {id: string}}) => getUser(params.id), {
        params: t.Object({
            id: t.String(),
        })
    })
    .post("/", ({ body }: { body: CreateUserBodyType }) => createUser(body), {
        body: CreateUserBody,
    })
    .delete("/:id", ({ body }: { body: { id: string } }) => deleteUser(body), {
            body: t.Object({
                id: t.String(),
            })
        }
    )
export default userRoutes
