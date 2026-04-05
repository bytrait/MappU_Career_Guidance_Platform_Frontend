import React from "react";

const APTITUDE_LABELS = {
  NA: "Numerical Ability",
  MR: "Mechanical Reasoning",
  LA: "Language Ability",
  LR: "Logical Reasoning",
  SA: "Spatial Ability",
};

const APTITUDE_LABELS_MR = {
  NA: "सांख्यिक क्षमता",
  MR: "यांत्रिक तर्क",
  LA: "भाषिक क्षमता",
  LR: "तार्किक तर्क",
  SA: "स्थानिक क्षमता",
};

const TAGS = {
  improvement: {
    en: "Needs Improvement",
    mr: "सुधारणा आवश्यक",
    color: "bg-red-100 text-red-700 border-red-300"
  },
  good: {
    en: "Good",
    mr: "चांगले",
    color: "bg-yellow-100 text-yellow-700 border-yellow-300"
  },
  strong: {
    en: "Strong",
    mr: "मजबूत",
    color: "bg-green-100 text-green-700 border-green-300"
  }
};

export default function DemoCareerFitSummary({
  aptitude = {},        // Ideal scores from career
  language = "en",
  userAptitude = null,  // Demo user aptitude scores
}) {

  // -----------------------------------------------------
  // DEMO fallback: if user scores not passed → use static
  // -----------------------------------------------------
  const demoUserScores = userAptitude || {
    NA: 6,
    MR: 5,
    LA: 7,
    LR: 6,
    SA: 4,
  };

  const labels = language === "mr" ? APTITUDE_LABELS_MR : APTITUDE_LABELS;

  const getRating = (user, ideal) => {
    const diff = ideal - user;
    if (diff >= 3) return TAGS.improvement;
    if (diff >= 1) return TAGS.good;
    return TAGS.strong;
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">

      <h3 className="text-sm font-semibold text-gray-800 mb-4">
        {language === "mr" ? "क्षमता तुलना" : "Aptitude Comparison"}
      </h3>

      <div className="space-y-6">

        {Object.entries(aptitude).map(([key, idealScore]) => {
          const userScore = demoUserScores[key] ?? 0;

          const userPercent = Math.round((userScore / 10) * 100);
          const idealPercent = Math.round((idealScore / 10) * 100);

          const rating = getRating(userScore, idealScore);
          const label = labels[key] || key;

          return (
            <div key={key}>

              {/* Title Row */}
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-700 font-semibold">
                  {label}
                </span>

                <span
                  className={`px-2 py-0.5 text-xs rounded-full border ${rating.color}`}
                >
                  {rating[language]}
                </span>
              </div>

              {/* Combined Bar */}
              <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                {/* Ideal score background */}
                <div
                  className="absolute top-0 left-0 h-full bg-blue-300"
                  style={{ width: `${idealPercent}%` }}
                />

                {/* User overlay */}
                <div
                  className="absolute top-0 left-0 h-full bg-blue-600"
                  style={{ width: `${userPercent}%` }}
                />
              </div>

              {/* Score Text */}
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>
                  {language === "mr"
                    ? `विद्यार्थी: ${userScore}/10`
                    : `User: ${userScore}/10`}
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
  );
}
