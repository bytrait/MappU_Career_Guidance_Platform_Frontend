import { useState } from "react";
import { createOrder, getPaymentStatus } from "../../../services/billingService";

export default function BuyCreditsCard() {
  const MIN_CREDITS = 10;

  const [studentCount, setStudentCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const PRICE_PER_STUDENT = Number(
    import.meta.env.VITE_PRICE_PER_STUDENT || 100
  );

  const suggestedPackages = [10, 20, 50];

  // 🔒 Validate input safely
  const handleCreditChange = (value) => {
    const numericValue = Number(value);

    if (!numericValue || numericValue < MIN_CREDITS) {
      setStudentCount(numericValue);
      setError(`Minimum ${MIN_CREDITS} credits required`);
      return;
    }

    setStudentCount(numericValue);
    setError("");
  };

  const handlePurchase = async () => {
    if (!studentCount || studentCount < MIN_CREDITS) {
      setError(`Minimum ${MIN_CREDITS} credits required`);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const order = await createOrder({
        studentCount
      });

      const options = {
        key: order.key,
        amount: order.amount,
        currency: "INR",
        order_id: order.orderId,
        name: "ByTrait",
        description: `${studentCount} Student Credits`,
        handler: function () {
          pollPaymentStatus(order.orderId);
        },
        theme: {
          color: "#4f46e5"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Purchase error:", error);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const pollPaymentStatus = async (orderId) => {
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;

      try {
        const statusRes = await getPaymentStatus(orderId);

        if (statusRes.status === "PAID") {
          clearInterval(interval);
          window.location.reload();
        }

        if (statusRes.status === "FAILED") {
          clearInterval(interval);
          setError("Payment failed.");
        }

        if (attempts > 10) {
          clearInterval(interval);
          setError("Payment verification timeout.");
        }

      } catch (error) {
        clearInterval(interval);
        console.error("Status check failed:", error);
      }

    }, 3000);
  };

  const totalAmount =
    studentCount && studentCount >= MIN_CREDITS
      ? studentCount * PRICE_PER_STUDENT
      : 0;

  const isInvalid = !studentCount || studentCount < MIN_CREDITS;

  return (
    <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 space-y-6">

      <h2 className="text-xl font-semibold text-gray-800">
        Buy Credits
      </h2>

      {/* Suggested Packages */}
      <div className="flex gap-3 flex-wrap">
        {suggestedPackages.map((pkg) => (
          <button
            key={pkg}
            onClick={() => {
              setStudentCount(pkg);
              setError("");
            }}
            className={`
              px-4 py-2 rounded-lg text-sm border transition
              ${
                studentCount === pkg
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            {pkg} Credits
          </button>
        ))}
      </div>

      {/* Custom Input */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Custom Credits
        </label>

        <input
          type="number"
          value={studentCount}
          onChange={(e) => handleCreditChange(e.target.value)}
          className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 ${
            isInvalid ? "border-red-400" : "border-gray-300"
          }`}
          min={MIN_CREDITS}
        />

        {error && (
          <p className="text-sm text-red-500 mt-1">
            {error}
          </p>
        )}
      </div>

      {/* Price Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-500">
          Price per student: ₹{PRICE_PER_STUDENT}
        </p>

        <p className="text-lg font-semibold text-gray-800 mt-2">
          Total: ₹{totalAmount}
        </p>
      </div>

      <button
        onClick={handlePurchase}
        disabled={loading || isInvalid}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>

    </div>
  );
}