"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../db/src/generated/prisma");
// // import { withAccelerate } from '@prisma/extension-accelerate'
// // const prisma = new PrismaClient()
// // const globalForPrisma = global as unknown as { prisma: typeof prisma }
// // if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
// // export { prisma };
const prismaClientSingleton = () => {
    return new prisma_1.PrismaClient();
};
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
exports.default = prisma;
if (process.env.NODE_ENV !== 'production')
    globalThis.prismaGlobal = prisma;
// export * from '@prisma/client';
