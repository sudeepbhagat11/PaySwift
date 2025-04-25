import { Card } from "../ui/card";

type TransactionCardProps = {
  transactions: {
    id: number;
    amount: number;
    date: Date | string;
    type: "Credited" | "Debited";
    source: "Bank" | "P2P";
    onRamp?: {
      provider: string;
    } | null;
    p2pTransfer?: {
      fromUser?: { name: string | null };
      toUser?: { name: string | null };
    } | null;
  }[];
};

export const TransactionCard = ({ transactions }: TransactionCardProps) => {
  return (
    <Card title="Transaction History" className="w-full h-full overflow-y-auto">
      {transactions.length === 0 ? (
        <div className="p-4 text-md text-gray-500">No transactions found.</div>
      ) : (
        <div className="divide-y divide-black-200">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between py-3">
              <div>
                <div className="text-md font-medium">
                  {tx.type} - {tx.source}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(tx.date).toLocaleString()}
                </div>
                {tx.source === "P2P" && tx.p2pTransfer && (
                  <div className="text-sm text-gray-400 mt-1">
                    {tx.type === "Credited"
                      ? `From: ${tx.p2pTransfer.fromUser?.name || "Unknown"}`
                      : `To: ${tx.p2pTransfer.toUser?.name || "Unknown"}`}
                  </div>
                )}
                {tx.source === "Bank" && tx.onRamp && (
                  <div className="text-sm text-gray-400 mt-1">
                    Via: {tx.onRamp.provider}
                  </div>
                )}
              </div>
              <div
                className={`text-md ${
                  tx.type === "Credited" ? "text-green-600" : "text-red-600"
                }`}
              >
                {tx.type === "Credited" ? "+" : "-"} ₹
                {(tx.amount / 100).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
