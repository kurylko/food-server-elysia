import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.user.findMany();
        console.log("Database connection successful!");
        console.log("Users:", users);
    } catch (error) {
        console.error("Error connecting to the database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
