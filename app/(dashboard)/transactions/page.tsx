// app/transactions/page.tsx
import { getUserTransactions } from "../../../actions/getTransactions";
import { TransactionCard } from "@/components/TransactionCard";

export default async function TransactionPage() {
  const transactions = await getUserTransactions();

  return (
    <div className="w-full">
      <TransactionCard transactions={transactions} />
    </div>
  );
}







