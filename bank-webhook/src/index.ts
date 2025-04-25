import express, { Request, Response } from 'express'; // Correct import style for express 5.x
import dotenv from 'dotenv';
import prisma from "../db/index";
import { createTransaction } from "./createTransaction";

dotenv.config();

const app = express(); // Correct instantiation of express application
app.use(express.json());

app.post("/hdfcWebhook", async (req: Request, res: Response) : Promise<any> => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    const userId = Number(paymentInformation.userId);
    const amount = Number(paymentInformation.amount);

    const existingTransaction = await prisma.onRampTransaction.findUnique({
      where: { token: paymentInformation.token },
    });

    if (existingTransaction && existingTransaction.status === "Success") {
      return res
        .status(400)
        .json({ message: "Token Invalid: Token has already been used" });
    }

    const [_, updatedOnRampTx] = await prisma.$transaction([
      prisma.balance.updateMany({
        where: { userId },
        data: { amount: { increment: amount } },
      }),
      prisma.onRampTransaction.update({
        where: { token: paymentInformation.token },
        data: { status: "Success" },
      }),
    ]);

    await createTransaction({
      userId,
      amount,
      type: "Credited",
      source: "Bank",
      onRampId: updatedOnRampTx.id,
    });

    res.json({ message: "Captured" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while processing webhook" });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
