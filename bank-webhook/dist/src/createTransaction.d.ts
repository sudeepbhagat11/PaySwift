type TransactionInput = {
    userId: number;
    amount: number;
    type: "Credited" | "Debited";
    source: "Bank" | "P2P";
    onRampId?: number;
    p2pTransferId?: number;
};
export declare function createTransaction({ userId, amount, type, source, onRampId, p2pTransferId }: TransactionInput): Promise<{
    message: string;
    error?: undefined;
} | {
    message: string;
    error: string;
}>;
export {};
//# sourceMappingURL=createTransaction.d.ts.map