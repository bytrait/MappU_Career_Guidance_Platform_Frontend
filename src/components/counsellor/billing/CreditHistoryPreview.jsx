import { useNavigate } from "react-router-dom";

export default function CreditHistoryPreview({ transactions }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Credit Activity
        </h2>

        <button
          onClick={() => navigate("/counsellor/billing/ledger")}
          className="text-sm text-indigo-600 hover:underline"
        >
          View All
        </button>
      </div>

      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            No recent transactions
          </p>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {tx.type}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`text-sm font-semibold ${
                  tx.type === "CONSUME"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {tx.type === "CONSUME" ? "-" : "+"}
                {tx.amount}
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
