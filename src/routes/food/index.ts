import {Elysia, t} from "elysia";
import {createFood, deleteFood, getFood, getFoods, updateFood} from "./handlers";

interface CreateFoodBody {
    foodName: string;
    fat: string;
    protein: string;
    carbohydrate: string;
    calories: string;
    weight?: string | undefined;
}


interface UpdateFoodBody {
    foodName?: string;
    fat?: string;
    protein?: string;
    carbohydrate?: string;
    calories?: string;
    weight?: string;
}

const CreateFoodBody = t.Object({
    foodName: t.String({
        minLength: 3,
        maxLength: 50
    }),
    fat: t.String(),
    protein: t.String(),
    carbohydrate: t.String(),
    calories: t.String(),
    weight: t.Optional(t.String())
});



const foodRoutes = new Elysia({prefix: "/food"})
    .get("/", () => getFoods())
    .get("/:id", ({params}: {params: {id: string}}) => getFood(params.id), {
        params: t.Object({
            id: t.String(),
        })
    })
    .post("/", ({body}: {body: typeof CreateFoodBody}) => createFood(body), {
        body: t.Object({
            foodName: t.String({
                minLength: 3,
                maxLength: 50
            }),
            fat: t.String(),
            protein: t.String(),
            carbohydrate: t.String(),
            calories: t.String(),
            weight: t.Optional(t.String())
        })
    })
    .patch("/:id", ({ params: { id }, body }: { params: { id: string }; body: UpdateFoodBody }) => updateFood(id, body), {
        params: t.Object({
            id: t.String(),
        }),
        body: t.Object({
                foodName: t.Optional(t.String({
                    minLength: 3,
                    maxLength: 50
                })),
                fat: t.Optional(t.String()),
                protein: t.Optional(t.String()),
                carbohydrate: t.Optional(t.String()),
                calories: t.Optional(t.String()),
                weight: t.Optional(t.String()),
            }, {minProperties: 1}
        )
    })
    .delete("/:id", ({ body }: { body: { id: string } }) => deleteFood(body), {
            body: t.Object({
                id: t.String(),
            })
        }
    )

export default foodRoutes