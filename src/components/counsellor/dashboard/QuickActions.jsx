import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Quick Actions
      </h3>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => navigate("/counsellor/students")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition"
        >
          View Students
        </button>

        <button
          onClick={() => navigate("/counsellor/billing/buy")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
        >
          Buy Credits
        </button>
      </div>
    </div>
  );
}
