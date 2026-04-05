// src/components/career/RecommendedNextSteps.jsx
import React from "react";

export default function RecommendedNextSteps({ recommendations = [], language = "en" }) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{language === "mr" ? "शिफारस केलेले पुढील पाऊले" : "Recommended Next Steps"}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {recommendations.map((r, idx) => (
          <div key={idx} className="p-3 border rounded-lg bg-gradient-to-br from-white to-blue-50">
            <div className="text-sm font-semibold text-gray-800">{r.title}</div>
            <div className="text-xs text-gray-600 mt-1">{r.desc}</div>
            {r.cta && <div className="mt-3"><a className="text-blue-600 text-sm font-medium">{r.cta}</a></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
