export default function PaymentHistoryTable({
  payments,
  meta,
  onPageChange
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Payment History
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Credits</th>
              <th className="py-2">Price/Student</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400">
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr
                  key={payment.razorpayOrderId}
                  className="border-b"
                >
                  <td className="py-3">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3">
                    {payment.studentCount}
                  </td>

                  <td className="py-3">
                    ₹{payment.pricePerStudent}
                  </td>

                  <td className="py-3 font-medium">
                    ₹{payment.totalAmount}
                  </td>

                  <td className="py-3">
                    <span
                      className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${
                          payment.status === "PAID"
                            ? "bg-green-100 text-green-600"
                            : payment.status === "FAILED"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }
                      `}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 text-sm">
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
