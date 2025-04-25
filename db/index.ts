import { PrismaClient } from "../db/src/generated/prisma";
// // import { withAccelerate } from '@prisma/extension-accelerate'

// // const prisma = new PrismaClient()

// // const globalForPrisma = global as unknown as { prisma: typeof prisma }

// // if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// // export { prisma };



const prismaClientSingleton = () => {
    return new PrismaClient()
  }
  
  declare global {
    // @ts-ignore
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
  }
  
  const prisma: ReturnType<typeof prismaClientSingleton> = globalThis.prismaGlobal ?? prismaClientSingleton()
  
  export default prisma
  
  if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma



// export * from '@prisma/client';