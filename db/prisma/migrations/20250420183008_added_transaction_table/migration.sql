-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('Credited', 'Debited');

-- CreateEnum
CREATE TYPE "TransactionSource" AS ENUM ('Bank', 'P2P');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "TransactionType" NOT NULL,
    "source" "TransactionSource" NOT NULL,
    "userId" INTEGER NOT NULL,
    "p2pTransferId" INTEGER,
    "onRampId" INTEGER,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_p2pTransferId_fkey" FOREIGN KEY ("p2pTransferId") REFERENCES "p2pTransfer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_onRampId_fkey" FOREIGN KEY ("onRampId") REFERENCES "OnRampTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
