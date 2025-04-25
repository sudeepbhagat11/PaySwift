"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import prisma from "@/db";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        // return {
        //     message: "Error while sending"
        // };
        throw new Error('Error while sending');
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        // return {
            // message: "User not found"
            throw new Error('Receiver Invalid');
        // };
    }

    await prisma.$transaction(async (tx) => {
        // Lock the balances to ensure atomic updates
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
        });

        if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
            
        }



        

        // Update balances
        await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
        });

        await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
        });


        


        console.log("Creating p2pTransfer with:", {
            amount,
            from,
            toUser,
            timestamp: new Date()
          });
          


        // Create P2P transfer record
        const p2pTransferRecord = await tx.p2pTransfer.create({
            data: {
                fromUserId: Number(from),
                toUserId: toUser.id,
                amount,
                timestamp: new Date(),
            }
        });




        console.log("Creating Transaction with:", {
            amount: p2pTransferRecord.amount,
            type: "Debited",
            source: "P2P",
            to,
            p2pTransferId: p2pTransferRecord.id
          });
          

        // Create a corresponding Transaction record
        await tx.transaction.create({
            data: {
                userId: Number(from), // The sender's user ID
                amount,
                type: "Debited", // Debited from sender's account
                source: "P2P", // The source of the transfer
                p2pTransferId: p2pTransferRecord.id, // Link to the p2p transfer record
            }
        });

        await tx.transaction.create({
            data: {
                userId: toUser.id, // The receiver's user ID
                amount,
                type: "Credited", // Credited to receiver's account
                source: "P2P", // The source of the transfer
                p2pTransferId: p2pTransferRecord.id, // Link to the p2p transfer record
            }
        });
    });

    return {
        message: "Transfer successful"
    };
}
