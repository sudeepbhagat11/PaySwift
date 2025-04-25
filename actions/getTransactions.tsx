// src/actions/getTransactions.ts
"use server";

import prisma from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function getUserTransactions() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return [];
  }

  return await prisma.transaction.findMany({
    where: { userId: Number(userId) },
    include: {
      onRamp: true,
      p2pTransfer: {
        include: {
          toUser: true,
          fromUser: true
        }
      }
    },
    orderBy: {
      date: "desc"
    }
  });
}
