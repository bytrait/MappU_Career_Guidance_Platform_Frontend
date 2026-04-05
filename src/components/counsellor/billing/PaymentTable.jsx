import { useNavigate } from "react-router-dom";

export default function PaymentTable({ payments }) {
    console.log("PaymentTable payments:", payments); // Debug log
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Payments
        </h2>

        <button
          onClick={() => navigate("/counsellor/billing/payments")}
          className="text-sm text-indigo-600 hover:underline"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Credits</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-400">
                  No payments yet
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.razorpayOrderId} className="border-b">
                  <td className="py-2">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-2">
                    {payment.studentCount}
                  </td>

                  <td className="py-2">
                    ₹{payment.totalAmount}
                  </td>

                  <td className="py-2">
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
    </div>
  );
}
