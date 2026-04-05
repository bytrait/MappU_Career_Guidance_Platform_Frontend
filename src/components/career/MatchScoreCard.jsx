// src/components/career/MatchScoreCard.jsx
import React from "react";

export default function MatchScoreCard({ matchScore = 0, language = "en" }) {
  const score = Math.round(matchScore);
  const getLabel = (v) => {
    if (v >= 75) return language === "mr" ? "उत्तम जुळणारे" : "Great Fit";
    if (v >= 45) return language === "mr" ? "मध्यम जुळणारे" : "Moderate Fit";
    return language === "mr" ? "कमी जुळणारे" : "Low Fit";
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{language === "mr" ? "एकूण जुळणारा गुण" : "Overall Fit"}</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{score}%</div>
        </div>

        <div className="text-sm px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">
          {getLabel(score)}
        </div>
      </div>

      <div className="mt-4">
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(100, score)}%` }} />
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {language === "mr" ? "RIASEC + OCEAN + Aptitude द्वारे मूल्यांकन" : "Computed from RIASEC, OCEAN & Aptitude"}
        </div>
      </div>
    </div>
  );
}
