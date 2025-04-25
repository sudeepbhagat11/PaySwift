"use server";
import { hashPassword } from "@/app/lib/auth";
import prisma from "@/db";

export async function signup(email: string, password: string, number: string) {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { number }
      ],
    },
  });

  if (existingUser) {
    throw new Error("Email or number already exists.");
  }

  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      number,
      password: hashedPassword,
    },
  });

  // Create balance with initial amount and locked = 0
  await prisma.balance.create({
    data: {
      userId: user.id,
      amount: 0,
      locked: 0,
    },
  });

  return "Signed up!";
}
