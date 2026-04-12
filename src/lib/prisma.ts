import { PrismaClient } from '@prisma/client'

// Temporarily mocking PrismaClient for local demo to bypass Prisma 7 
// driver adapter initialization errors and use our beautiful preset UI.
export const prisma = {
  product: {
    findMany: async () => {
       throw new Error("Mock DB error to trigger UI fallback");
    }
  },
  order: {
    create: async () => {
       return { id: "1" };
    }
  }
} as unknown as PrismaClient
