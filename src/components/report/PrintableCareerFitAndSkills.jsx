// src/components/printables/PrintableCareerFitAndSkills.jsx
import React from "react";

/* ---------------- LABELS ---------------- */

const APTITUDE_LABELS = {
  NA: { en: "Numerical Ability", mr: "सांख्यिक क्षमता" },
  MR: { en: "Mechanical Reasoning", mr: "यांत्रिक तर्क" },
  LA: { en: "Language Ability", mr: "भाषिक क्षमता" },
  LR: { en: "Logical Reasoning", mr: "तार्किक तर्क" },
  SA: { en: "Spatial Ability", mr: "स्थानिक क्षमता" },
};

/* ---------------- RATING LOGIC ---------------- */

function getRating(userPct, idealPct, language) {
  const diff = idealPct - userPct;

  if (diff >= 25) {
    return language === "mr"
      ? { text: "सुधारणा आवश्यक", color: "bg-red-100 text-red-700 border-red-300" }
      : { text: "Needs Improvement", color: "bg-red-100 text-red-700 border-red-300" };
  }

  if (diff >= 10) {
    return language === "mr"
      ? { text: "चांगले", color: "bg-yellow-100 text-yellow-700 border-yellow-300" }
      : { text: "Good", color: "bg-yellow-100 text-yellow-700 border-yellow-300" };
  }

  return language === "mr"
    ? { text: "मजबूत", color: "bg-green-100 text-green-700 border-green-300" }
    : { text: "Strong", color: "bg-green-100 text-green-700 border-green-300" };
}

/* ---------------- COMPONENT ---------------- */

export default function PrintableCareerFitAndSkills({
  matchScore = 0,                 // career similarity %
  userAptitude = {},              // { NA: 6, LR: 8 ... } (0–10)
  idealAptitude = {},             // { NA: 8, LR: 9 ... } (0–10)
  language = "en",
}) {
  return (
    <div
      className="bg-white rounded-2xl p-4 border border-gray-200 print:break-inside-avoid"
    >
      {/* ================= CAREER MATCH ================= */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">
          {language === "mr" ? "करिअर जुळवणी" : "Career Match"}
        </h4>

        <div className="flex items-center gap-3">
          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-blue-600"
              style={{ width: `${matchScore}%` }}
            />
          </div>

          <span className="text-sm font-semibold text-blue-700 whitespace-nowrap">
            {matchScore}%
          </span>
        </div>
      </div>

      {/* ================= SKILLS GAP ================= */}
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-4">
          {language === "mr" ? "कौशल्य तयारी" : "Skills Readiness"}
        </h4>

        <div className="space-y-5">
          {Object.entries(idealAptitude).map(([code, idealScore]) => {
            const userScore = userAptitude[code] ?? 0;

            const idealPct = Math.round((idealScore / 10) * 100);
            const userPct = Math.round((userScore / 10) * 100);

            const label =
              APTITUDE_LABELS[code]?.[language] || code;

            const rating = getRating(userPct, idealPct, language);

            return (
              <div key={code}>
                {/* Title + Tag */}
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {label}
                  </span>

                  <span
                    className={`px-2 py-0.5 text-xs rounded-full border ${rating.color}`}
                  >
                    {rating.text}
                  </span>
                </div>

                {/* Bar */}
                <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  {/* Ideal */}
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-300"
                    style={{ width: `${idealPct}%` }}
                  />
                  {/* User */}
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-600"
                    style={{ width: `${userPct}%` }}
                  />
                </div>

                {/* Scores */}
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>
                    {language === "mr"
                      ? `विद्यार्थी: ${userScore}/10`
                      : `You: ${userScore}/10`}
                  </span>
                  <span>
                    {language === "mr"
                      ? `आदर्श: ${idealScore}/10`
                      : `Ideal: ${idealScore}/10`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
