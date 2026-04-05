export default function CreditLedgerTable({
  transactions,
  meta,
  onPageChange,
  filter,
  setFilter
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Credit Ledger
        </h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 text-sm"
        >
          <option value="">All</option>
          <option value="PURCHASE">Purchase</option>
          <option value="CONSUME">Consume</option>
          <option value="REFUND">Refund</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Type</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Description</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-400">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="border-b">
                  <td className="py-3">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3">
                    <span
                      className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${
                          tx.type === "PURCHASE"
                            ? "bg-green-100 text-green-600"
                            : tx.type === "CONSUME"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }
                      `}
                    >
                      {tx.type}
                    </span>
                  </td>

                  <td
                    className={`py-3 font-semibold ${
                      tx.type === "CONSUME"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {tx.type === "CONSUME" ? "-" : "+"}
                    {tx.amount}
                  </td>

                  <td className="py-3 text-gray-600">
                    {tx.description || "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex justify-between items-center text-sm mt-4">
          <span>
            Page {meta.page} of {meta.totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={meta.page === 1}
              onClick={() => onPageChange(meta.page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <button
              disabled={meta.page === meta.totalPages}
              onClick={() => onPageChange(meta.page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
