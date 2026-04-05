// src/components/print/PrintableCareerPage.jsx

import React from "react";

export default function PrintableCareerPage({ career, language }) {
  if (!career) return null;

  const t = (obj) => obj?.[language] || obj?.value || "";

  const steps = (career.steps || [])
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((s) => ({
      title: t(s.title),
      content: t(s.note),
    }));

  return (
    <div className="print:break-after-page my-10 p-6 border rounded-lg bg-white">
      <h1 className="text-3xl font-bold text-gray-900">{t(career.title)}</h1>

      <p className="text-gray-700 mt-3 text-lg">{t(career.description)}</p>

      {/* Match Score */}
      <p className="mt-4 text-gray-900 font-semibold">
        {language === "mr" ? "जुळणी:" : "Match:"} {career.similarity}%
      </p>

      {/* Salary */}
      {career.salary_snapshot && (
        <p className="mt-2 text-gray-700">
          <strong>{language === "mr" ? "पगार:" : "Salary:"}</strong>{" "}
          {career.salary_snapshot}
        </p>
      )}

      {/* Strengths */}
      {career.strengths?.length > 0 && (
        <div className="mt-4">
          <strong className="text-gray-900">
            {language === "mr" ? "बळकटी:" : "Strengths:"}
          </strong>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            {career.strengths.map((s, i) => (
              <li key={i}>{t(s)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Steps */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {language === "mr" ? "पायऱ्या:" : "Steps:"}
        </h2>

        {steps.map((step, i) => (
          <div key={i} className="mt-4">
            <h3 className="font-semibold text-xl">{step.title}</h3>
            <p className="text-gray-700 mt-1">{step.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
