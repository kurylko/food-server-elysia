import db from './../../db/index';
import {NotFoundError} from "elysia";

export async function getUsers() {
    try {
        return await db.user.findMany({})
    } catch (e: unknown) {
        console.log(`Error fetching users ${e}`)
    }
}

export async function getUser(id: string) {
    try {
        const food = await db.user.findUnique({where: {id: id}})
        if (!food) {
            throw new NotFoundError("User not found");
        }
        return food;
    } catch (e: unknown) {
        console.log(`Error fetching user: ${e}`)
    }
}


export async function createUser(options: {email: string, name: string, password: string }){
    try {
        const {email, name, password } = options;
        return await db.user.create({data: {email, name, password } });
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`Error creating a user: ${e.message}`);
        } else {
            console.error(`Unknown error creating a user: ${e}`);
        }
        console.log(`Error creating a user ${e}`)
    }
}


export async function updateUser(id: string, options: { email?: string, name?: string, password?: string}) {
    try {
        const {email, name, password } = options;
        return await db.user.update({
            where: {id},
            data: {
                ...(email ? {email} : {}),
                ...(name ? {name} : {}),
                ...(password ? {password} : {}),
            }
        })
    } catch (e: unknown) {
        console.log(`Error updating user ${e}`)
    }
}

export async function deleteUser(options: { id: string }) {
    try {
        const {id} = options;
        return await db.user.delete({where: {id} })
    } catch (e: unknown) {
        console.log(`Error deleting user ${e}`)
    }
}
