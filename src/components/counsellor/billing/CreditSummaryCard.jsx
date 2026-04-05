export default function CreditSummaryCard({
  total,
  used,
  available
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Credit Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">Total Credits</p>
          <p className="text-2xl font-bold text-gray-800">{total}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Used Credits</p>
          <p className="text-2xl font-bold text-gray-800">{used}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Available Credits</p>
          <p className="text-2xl font-bold text-green-600">{available}</p>
        </div>
      </div>
    </div>
  );
}
