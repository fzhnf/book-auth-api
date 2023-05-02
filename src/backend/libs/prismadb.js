import { PrismaClient } from"@prisma/client";

if (!global.prisma) {
global.prisma = new PrismaClient();
}

const prisma = global.prisma;

if (process.env.NODE_ENV !== "production") {
global.prisma = prisma;
}

export default prisma;