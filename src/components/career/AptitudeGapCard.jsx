// src/components/career/AptitudeGapCard.jsx
import React from "react";
import { interpretGap } from "../../utils/formatters";

export default function AptitudeGapCard({ aptitudeRequirements = {}, userAptitudes = {}, language = "en" }) {
  // aptitudeRequirements: {NA:6, MR:4, LA:7, LR:8, SA:5}
  // userAptitudes: {NA:5, MR:3, LA:7, LR:5, SA:4}
  const codes = ["NA", "MR", "LA", "LR", "SA"];
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">{language === "mr" ? "क्षमता अंतर" : "Aptitude Skill-Gap"}</h3>
        <div className="text-xs text-gray-500">{language === "mr" ? "तुलना" : "Required vs You"}</div>
      </div>

      <div className="mt-3 space-y-3">
        {codes.map((code) => {
          const req = Number(aptitudeRequirements?.[code] ?? 0);
          const you = Number(userAptitudes?.[code] ?? 0);
          const gap = req - you;
          const { label, colorClass, icon } = interpretGap(gap, language);

          return (
            <div key={code} className="flex items-center gap-3">
              <div className="w-16 text-xs text-gray-600">{code}</div>

              <div className="flex-1">
                <div className="text-xs text-gray-500 flex items-center justify-between">
                  <span>{language === "mr" ? "आवश्यक" : "Required"}: <strong className="text-gray-700 ml-1">{req}</strong></span>
                  <span>{language === "mr" ? "तुमचे" : "You"}: <strong className="text-gray-700 ml-1">{you}</strong></span>
                </div>

                <div className="mt-1 relative h-3 bg-gray-100 rounded-full">
                  {/* required marker */}
                  <div
                    className="absolute h-full bg-blue-300 rounded-full"
                    style={{ width: `${(req / 10) * 100}%`, opacity: 0.6 }}
                    aria-hidden
                  />
                  {/* you marker */}
                  <div
                    className="absolute h-full bg-blue-600 rounded-full"
                    style={{ width: `${(you / 10) * 100}%` }}
                    aria-hidden
                  />
                </div>
              </div>

              <div className={`ml-3 text-sm font-semibold ${colorClass} flex items-center gap-1`}>
                <i className={`bi ${icon} text-sm`}></i>
                <span>{label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
