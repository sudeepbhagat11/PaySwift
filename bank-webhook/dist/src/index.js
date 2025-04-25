"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Correct import style for express 5.x
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("../db/index"));
const createTransaction_1 = require("./createTransaction");
dotenv_1.default.config();
const app = (0, express_1.default)(); // Correct instantiation of express application
app.use(express_1.default.json());
app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount,
    };
    try {
        const userId = Number(paymentInformation.userId);
        const amount = Number(paymentInformation.amount);
        const existingTransaction = await index_1.default.onRampTransaction.findUnique({
            where: { token: paymentInformation.token },
        });
        if (existingTransaction && existingTransaction.status === "Success") {
            return res
                .status(400)
                .json({ message: "Token Invalid: Token has already been used" });
        }
        const [_, updatedOnRampTx] = await index_1.default.$transaction([
            index_1.default.balance.updateMany({
                where: { userId },
                data: { amount: { increment: amount } },
            }),
            index_1.default.onRampTransaction.update({
                where: { token: paymentInformation.token },
                data: { status: "Success" },
            }),
        ]);
        await (0, createTransaction_1.createTransaction)({
            userId,
            amount,
            type: "Credited",
            source: "Bank",
            onRampId: updatedOnRampTx.id,
        });
        res.json({ message: "Captured" });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error while processing webhook" });
    }
});
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
