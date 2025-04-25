"use server";

import prisma from "../db/index";

type TransactionInput = {
  userId: number;
  amount: number;
  type: "Credited" | "Debited";
  source: "Bank" | "P2P";
  onRampId?: number;
  p2pTransferId?: number;
};

export async function createTransaction({
  userId,
  amount,
  type,
  source,
  onRampId,
  p2pTransferId
}: TransactionInput) {
  try {
    await prisma.transaction.create({
      data: {
        userId,
        amount,
        type,
        source,
        onRampId,
        p2pTransferId
      }
    });

    return {
      message: "Transaction created successfully"
    };
  } catch (error) {
    console.error("Transaction creation failed:", error);
    return {
      message: "Transaction creation failed",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
