import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function connectWithRetry(retries = 5, delay = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            await client.$connect();
            console.log("Database connection successful!");
            return;
        } catch (error) {
            console.error(`Connection attempt ${i + 1} failed. Retrying in ${delay / 1000} seconds...`);
            if (i === retries - 1) {
                throw new Error("Max retries reached. Could not connect to the database.");
            }
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

async function main() {
    try {
        await connectWithRetry();
        const foods = await client.food.findMany();
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
