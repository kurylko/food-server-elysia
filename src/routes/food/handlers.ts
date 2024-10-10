import db from './../../db/index';
import {NotFoundError} from "elysia";

export async function getFoods() {
    try {
        return await db.food.findMany({})
    } catch (e: unknown) {
        console.log(`Error fetching food items ${e}`)
    }
}

export async function getFood(id: string) {
    try {
        const food = await db.food.findUnique({where: {id: id}})
        if (!food) {
            throw new NotFoundError("Food item not found");
        }
        return food;
    } catch (e: unknown) {
        console.log(`Error fetching food item ${e}`)
    }
}


export async function createFood(options: {foodName: string, fat: string, protein: string, carbohydrate: string, calories: string, weight?: string }){
    try {
        const {foodName, fat, protein, carbohydrate, calories, weight } = options;
        return await db.food.create({data: {foodName, fat, protein, carbohydrate, calories, weight } });
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error creating a food item: ${e.message}`);
        } else {
            console.error(`Unknown error creating a food item: ${e}`);
        }
        console.log(`Error creating a food item ${e}`)
    }
}


export async function updateFood(id: string, options: { foodName?: string, fat?: string, protein?: string, carbohydrate?: string, calories?: string, weight?: string }) {
    try {
        const {foodName, fat, protein, carbohydrate, calories, weight } = options;
        return await db.food.update({
            where: {id},
            data: {
                ...(foodName ? {foodName} : {}),
                ...(fat ? {fat} : {}),
                ...(protein ? {protein} : {}),
                ...(carbohydrate ? {carbohydrate} : {}),
                ...(calories ? {calories} : {}),
                ...(weight ? {weight} : {}),
            }
        })
    } catch (e: unknown) {
        console.log(`Error updating food item ${e}`)
    }
}

export async function deleteFood(options: { id: string }) {
    try {
        const {id} = options;
        return await db.food.delete({where: {id} })
    } catch (e: unknown) {
        console.log(`Error deleting food item ${e}`)
    }
}
