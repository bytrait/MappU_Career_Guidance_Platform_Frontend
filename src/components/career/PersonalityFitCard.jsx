// src/components/career/PersonalityFitCard.jsx
import React from "react";

export default function PersonalityFitCard({ ocean = [], userOcean = [], language = "en" }) {
  // show a brief summary comparing user's OCEAN vs career OCEAN
  // ocean is [O,C,E,A,N]
  const traits = ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"];
  const labelsMr = ["मोकळेपणा", "कर्मठपणा", "बहिर्मुखता", "सहमतता", "भावनिक अस्थिरता"];

  const rows = traits.map((t, i) => {
    const careerVal = Number(ocean?.[i] ?? 0);
    const userVal = Number(userOcean?.[i] ?? 0);
    const diff = Math.round(userVal - careerVal);
    return {
      key: t,
      label: language === "mr" ? labelsMr[i] : t,
      careerVal,
      userVal,
      diff,
    };
  });

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-800">{language === "mr" ? "व्यक्तिमत्त्व तुलना" : "Personality Fit"}</h3>
      <div className="mt-3 space-y-2">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center justify-between">
            <div className="text-sm text-gray-700">{r.label}</div>
            <div className="text-xs text-gray-500">You {r.userVal} · Career {r.careerVal}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
