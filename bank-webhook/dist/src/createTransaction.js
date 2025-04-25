"use server";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = createTransaction;
const index_1 = __importDefault(require("../db/index"));
async function createTransaction({ userId, amount, type, source, onRampId, p2pTransferId }) {
    try {
        await index_1.default.transaction.create({
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
    }
    catch (error) {
        console.error("Transaction creation failed:", error);
        return {
            message: "Transaction creation failed",
            error: error instanceof Error ? error.message : "Unknown error"
        };
    }
}
