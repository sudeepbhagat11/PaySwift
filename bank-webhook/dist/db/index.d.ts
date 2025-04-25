import { PrismaClient } from "../../db/src/generated/prisma";
declare const prismaClientSingleton: () => PrismaClient<import("../../db/src/generated/prisma").Prisma.PrismaClientOptions, never, import("../../db/src/generated/prisma/runtime/library").DefaultArgs>;
declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}
declare const prisma: ReturnType<typeof prismaClientSingleton>;
export default prisma;
//# sourceMappingURL=index.d.ts.map