import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function main() {
    try {
        const foods = await client.food.findMany();
        console.log("Database connection successful!");
        console.log("Foods:", foods);
        const users = await client.user.findMany();
        console.log("Users:", users);
    } catch (error) {
        console.error("Error connecting to the database:", error);
    } finally {
        await client.$disconnect();
    }
}

main();
