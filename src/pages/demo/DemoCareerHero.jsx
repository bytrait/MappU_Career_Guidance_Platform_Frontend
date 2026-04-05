import React from "react";
import DemoCareerFitSummary from "./DemoCareerFitSummary";

// RIASEC labels
const RIASEC_LABELS = {
  R: "Realistic",
  I: "Investigative",
  A: "Artistic",
  S: "Social",
  E: "Enterprising",
  C: "Conventional",
};

// Match label
function getMatchLabel(score, language = "en") {
  if (score >= 75) return language === "mr" ? "उत्तम जुळणारे" : "Great Fit";
  if (score >= 45) return language === "mr" ? "मध्यम जुळणारे" : "Moderate Fit";
  return language === "mr" ? "कमी जुळणारे" : "Low Fit";
}

// Circular Score Component
function CircularScore({ score, language }) {
  const radius = 40;
  const stroke = 8;
  const normalized = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalized;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-50 h-50">
      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
        <circle cx="50" cy="50" r={normalized} stroke="#e5e7eb" strokeWidth={stroke} fill="transparent" />
        <circle
          cx="50"
          cy="50"
          r={normalized}
          stroke="#2563eb"
          strokeWidth={stroke}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xl font-bold text-gray-900">{score}%</div>
        <div className="text-xs text-gray-600 text-center leading-tight">
          {getMatchLabel(score, language)}
        </div>
      </div>
    </div>
  );
}

export default function DemoCareerHero({
  title,
  subtitle,
  matchScore,
  strengths = [],
  riasec = {},
  minCost = "₹—",
  maxCost = "₹—",
  avgSalary = "₹—",
  aptitude = {},
  language = "en",
}) {
  // Top 3 RIASEC traits
  const topRiasec = Object.entries(riasec)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([code]) => RIASEC_LABELS[code]);

  return (
    <header className="relative py-10 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">



        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* LEFT BLOCK */}
          <div className="md:col-span-2">

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-gray-600 mt-2 max-w-3xl">{subtitle}</p>
            )}

            {/* Mobile Score */}
            <div className="flex justify-center mb-6 md:hidden">
              <CircularScore score={matchScore} language={language} />
            </div>

            {/* Strengths */}
            {/* <div className="mt-4 flex flex-wrap gap-2">
              {strengths.slice(0, 6).map((s, i) => (
                <span
                  key={i}
                  className="bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 shadow-sm"
                >
                  {s}
                </span>
              ))}
            </div> */}

            {/* RIASEC */}
            {topRiasec.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {topRiasec.map((label, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-sm"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}

            {/* Cost & Salary Cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border shadow-sm flex items-start gap-3">
                <i className="bi bi-cash-stack text-blue-600 text-2xl"></i>
                <div>
                  <div className="text-xs text-gray-500">
                    {language === "mr" ? "किमान खर्च" : "Minimum Cost"}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mt-1">{minCost}</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border shadow-sm flex items-start gap-3">
                <i className="bi bi-wallet2 text-blue-600 text-2xl"></i>
                <div>
                  <div className="text-xs text-gray-500">
                    {language === "mr" ? "कमाल खर्च" : "Maximum Cost"}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mt-1">{maxCost}</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border shadow-sm flex items-start gap-3">
                <i className="bi bi-graph-up text-blue-600 text-2xl"></i>
                <div>
                  <div className="text-xs text-gray-500">
                    {language === "mr" ? "सरासरी पगार" : "Average Salary"}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 mt-1">{avgSalary}</div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE SCORE */}
          <div className="hidden md:flex items-center justify-center">
            <CircularScore score={matchScore} language={language} />
          </div>

        </div>

        {/* Fit Summary */}
        <div className="mt-8">
          <DemoCareerFitSummary aptitude={aptitude} language={language} />
        </div>

        {/* Motivational Note */}
        <div className="mt-3 text-gray-600">
          {language === "mr"
            ? "लक्षात ठेवा, क्षमता गुण फक्त तुमची आजची पातळी दर्शवतात — तुम्ही काय बनू शकता ते नाही."
            : "Remember, aptitude scores show where you are today — not what you can become."}
        </div>

      </div>
    </header>
  );
}
