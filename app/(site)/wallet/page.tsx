"use client";
import { ArrowLeftRight, Plus } from "lucide-react";

const transactions = [
    { id: "OR", name: "Orlando Rodrigues", type: "Bank account", date: "2024/04/01", amount: 750, credit: true },
    { id: "N", name: "Netflix", type: "Credit card", date: "2024/03/29", amount: 9.90, credit: false },
    { id: "S", name: "Spotify", type: "Credit card", date: "2024/03/29", amount: 19.90, credit: false },
    { id: "CA", name: "Carl Andrew", type: "Bank account", date: "2024/03/27", amount: 400, credit: true },
    { id: "CM", name: "Carrefour Market", type: "Credit card", date: "2024/03/26", amount: 64.33, credit: false },
    { id: "A", name: "Amazon", type: "Credit card", date: "2024/03/24", amount: 147.90, credit: false },
    { id: "S", name: "Shopify", type: "Credit card", date: "2024/03/21", amount: 57.98, credit: false },
];

export default function WalletPage() {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
                {/* Add Income Card */}
                <div className="bg-white rounded-xl p-2">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Plus className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <h2 className="font-medium">Add income</h2>
                            <p className="text-sm text-gray-500">Create an income manually</p>
                        </div>
                    </div>
                </div>

                {/* Transfer Money Card */}
                <div className="bg-white rounded-xl p-2">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <ArrowLeftRight className="h-6 w-6 px-1 text-white" />
                        </div>
                        <div>
                            <h2 className="font-medium">Transfer money</h2>
                            <p className="text-sm text-gray-500">Select the amount and make a transfer</p>
                        </div>
                    </div>
                </div>
                 {/* Withdraw Money Card */}
                <div className="bg-white rounded-xl p-2">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <ArrowLeftRight className="h-6 w-6 px-1 text-white" />
                        </div>
                        <div>
                            <h2 className="font-medium">Withdraw money</h2>
                            <p className="text-sm text-gray-500">Select the amount and make a Withdraw</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 bg-white my-8 rounded-xl">
                {/* Transactions */}
                <h2 className="font-medium mb-4">Last transactions</h2>
                <p className="text-sm text-gray-500 mb-4">Check your last transactions</p>

                <table className="w-full">
                    <thead>
                        <tr className="text-sm text-gray-600">
                            <th className="text-left pb-4">Description</th>
                            <th className="text-left pb-4">Method</th>
                            <th className="text-left pb-4">Date</th>
                            <th className="text-right pb-4">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {transactions.map((transaction) => (
                            <tr key={transaction.name} className="text-sm">
                                <td className="py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center font-medium">
                                            {transaction.id}
                                        </div>
                                        <span className="font-medium">{transaction.name}</span>
                                    </div>
                                </td>
                                <td className="py-4">{transaction.type}</td>
                                <td className="py-4">{transaction.date}</td>
                                <td className={`py-4 text-right font-medium ${transaction.credit ? "text-green-600" : "text-red-600"
                                    }`}>
                                    {transaction.credit ? "+" : "-"}${transaction.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}