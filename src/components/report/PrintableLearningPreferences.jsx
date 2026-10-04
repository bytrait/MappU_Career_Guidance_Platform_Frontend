import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import {
  LEARNING_DIMENSIONS,
  getLearningContent,
} from "../../data/learningProfileContent";

const DIMENSION_ICONS = {
  VIS: "bi-eye-fill",
  ACT: "bi-lightning-charge-fill",
  STR: "bi-diagram-3-fill",
  PRA: "bi-tools",
  COL: "bi-people-fill",
};

function LearningCard({ dim, score, language }) {
  const c = getLearningContent(dim.code, score, language);
  if (!c) return null;

  const icon = DIMENSION_ICONS[dim.code] || "bi-lightbulb-fill";
  const dimTitle = dim.label?.[language] || dim.label?.en || dim.code;

  return (
    <div
      className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between"
      style={{ pageBreakInside: "avoid", boxSizing: "border-box" }}
    >
      <div>
        {/* 1. Header: Icon + Title + Preference Badge */}
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-semibold text-[15px] flex items-center" style={{ color: "#1e3a8a" }}>
            <i className={`bi ${icon} mr-2`} style={{ color: "#2563eb" }} />
            {dimTitle}
          </h3>

          <div
            className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold border"
            style={{ backgroundColor: "#eff6ff", color: "#1d4ed8", borderColor: "#bfdbfe" }}
          >
            {c.badge}
          </div>
        </div>

        {/* 2. Meaning Box */}
        <div
          className="rounded-xl p-2.5 mb-2.5 border"
          style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}
        >
          <p className="text-xs leading-relaxed font-medium" style={{ color: "#1e293b" }}>
            {c.suggest}
          </p>
        </div>

        {/* 3. Two-Column Grid: Behavior & Learning */}
        <div className="grid grid-cols-2 gap-2 mb-2.5">
          <div
            className="rounded-lg p-2 border"
            style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}
          >
            <p className="text-[11px] font-semibold mb-0.5" style={{ color: "#64748b" }}>
              {language === "mr" ? "वर्तन" : "Behavior"}
            </p>
            <p className="text-xs font-medium line-clamp-2" style={{ color: "#334155" }}>
              {c.behavior}
            </p>
          </div>

          <div
            className="rounded-lg p-2 border"
            style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}
          >
            <p className="text-[11px] font-semibold mb-0.5" style={{ color: "#64748b" }}>
              {language === "mr" ? "शिकणे" : "Learning"}
            </p>
            <p className="text-xs font-medium line-clamp-2" style={{ color: "#334155" }}>
              {c.learning}
            </p>
          </div>
        </div>

        {/* 4. Strength Callout */}
        <div
          className="rounded-xl p-2.5 mb-2.5 border"
          style={{ backgroundColor: "#eff6ff", borderColor: "#bfdbfe" }}
        >
          <p className="text-[11px] font-bold mb-0.5" style={{ color: "#1e3a8a" }}>Strength</p>
          <p className="text-xs font-semibold" style={{ color: "#1d4ed8" }}>
            {c.strength}
          </p>
        </div>
      </div>

      <div className="mt-1">
        {/* 5. Growth Footer */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-[11px] font-medium" style={{ color: "#64748b" }}>Growth</p>
          <p className="text-xs" style={{ color: "#334155" }}>
            {c.watch}
          </p>
        </div>

        {/* 6. Reflection Footer */}
        <div className="pt-1.5 border-t border-gray-100 mt-1.5">
          <p className="text-[11px] font-medium" style={{ color: "#64748b" }}>Reflection</p>
          <p className="text-xs italic" style={{ color: "#475569" }}>
            {c.reflection}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PrintableLearningPreferences({
  scores = [],
  language = "en",
}) {
  const learningScores = useMemo(() => {
    const map = {};
    scores
      .filter((s) => s.assessmentType === "LEARNING_PREFERENCE" || s.assessmentType === "LEARNING_STYLE" || s.assessmentType === "LEARNING")
      .forEach((s) => {
        map[s.traitOrCategoryCode] = Number(s.score) || 0;
      });
    return map;
  }, [scores]);

  const hasData = Object.keys(learningScores).length > 0;
  if (!hasData) return null;

  const chartData = LEARNING_DIMENSIONS.map((d) => ({
    name: (d.label?.[language] || d.label?.en || d.code),
    score: learningScores[d.code] ?? 0,
  }));

  const page1Dimensions = LEARNING_DIMENSIONS.slice(0, 2);
  const page2Dimensions = LEARNING_DIMENSIONS.slice(2, 5);

  return (
    <>
      {/* ---------------- PAGE 1 OF LEARNING PREFERENCES ---------------- */}
      <div
        className="print-page font-sans text-gray-900"
        style={{
          width: "210mm",
          height: "297mm",
          maxHeight: "297mm",
          boxSizing: "border-box",
          padding: "10mm 14mm",
          background: "#ffffff",
          overflow: "hidden",
          pageBreakAfter: "always",
          breakAfter: "page",
        }}
      >
        {/* HEADER */}
        <div className="text-center mb-3">
          <div className="flex justify-center items-center gap-3">
            <i className="bi bi-compass-fill text-3xl" style={{ color: "#2563eb" }} />
            <h1 className="text-3xl font-bold" style={{ color: "#1e3a8a" }}>
              {language === "mr" ? "शिक्षण प्राधान्ये" : "Learning Preferences"}
            </h1>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {language === "mr"
              ? "तुमची माहिती समजून घेण्याची आणि शिकण्याची नैसर्गिक पद्धत"
              : "Discover your natural approaches to absorbing and applying information"}
          </p>

          <div className="mt-2 mb-2">
            <hr style={{ border: "none", height: 1, backgroundColor: "#e2e8f0" }} />
          </div>

          <p className="text-xs text-gray-600 max-w-2xl mx-auto">
            {language === "mr"
              ? "हे प्राधान्ये आहेत — निश्चित शिकण्याच्या मर्यादा नसून तुमच्या पद्धतींना अनुकूल दिशा आहेत."
              : "These are preferences based on your responses — flexible learning modes that guide effective study habits."}
          </p>
        </div>

        {/* HORIZONTAL SPECTRUM CHART */}
        <div className="flex justify-center mb-3">
          <BarChart
            layout="vertical"
            width={580}
            height={185}
            data={chartData}
            margin={{ top: 5, right: 40, left: 10, bottom: 5 }}
          >
            <CartesianGrid stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={{ fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="name"
              width={170}
              tick={{ fontSize: 11, fill: "#1e3a8a", fontWeight: 600 }}
            />
            <Tooltip />
            <ReferenceLine
              x={50}
              stroke="#94a3b8"
              strokeDasharray="3 3"
              label={{
                value: language === "mr" ? "संतुलित" : "Balanced",
                position: "top",
                fill: "#64748b",
                fontSize: 10,
              }}
            />
            <Bar dataKey="score" fill="#2563eb" isAnimationActive={false} radius={[0, 4, 4, 0]}>
              <LabelList
                dataKey="score"
                position="right"
                fill="#1e3a8a"
                fontSize={11}
                fontWeight={600}
                formatter={(val) => `${val}/100`}
              />
            </Bar>
          </BarChart>
        </div>

        {/* SUBTITLE */}
        <div className="w-full mb-3">
          <h3 className="text-xl font-bold" style={{ color: "#1e3a8a" }}>
            {language === "mr" ? "शिक्षण पद्धतींचे विश्लेषण" : "Learning Modes Insights"}
          </h3>
          <p className="text-xs text-gray-500">
            {language === "mr"
              ? "दृश्य आणि प्रत्यक्ष अनुभवांवर आधारित प्राधान्ये"
              : "Detailed breakdown of information processing preferences"}
          </p>
        </div>

        {/* 2 DIMENSIONS ROW */}
        <div className="grid grid-cols-2 gap-4">
          {page1Dimensions.map((dim) => (
            <LearningCard
              key={dim.code}
              dim={dim}
              score={learningScores[dim.code] || 0}
              language={language}
            />
          ))}
        </div>
      </div>

      {/* ---------------- PAGE 2 OF LEARNING PREFERENCES ---------------- */}
      <div
        className="print-page font-sans text-gray-900"
        style={{
          width: "210mm",
          height: "297mm",
          maxHeight: "297mm",
          boxSizing: "border-box",
          padding: "12mm 14mm",
          background: "#ffffff",
          overflow: "hidden",
          pageBreakAfter: "always",
          breakAfter: "page",
        }}
      >
        {/* Page 2 Header */}
        <div className="w-full mb-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h2 className="text-xl font-bold" style={{ color: "#1e3a8a" }}>
              {language === "mr" ? "शिक्षण पद्धतींचे विश्लेषण (भाग २)" : "Learning Modes Insights (Part 2)"}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {language === "mr" ? "सविस्तर विश्लेषण" : "Detailed Insights"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {page2Dimensions.map((dim) => (
            <LearningCard
              key={dim.code}
              dim={dim}
              score={learningScores[dim.code] || 0}
              language={language}
            />
          ))}

          {/* 4th Card in 2x2 Grid (Motivation Card) */}
          <div
            className="rounded-2xl p-6 flex flex-col items-center justify-center text-center border"
            style={{
              backgroundColor: "#eff6ff",
              borderColor: "#bfdbfe",
              pageBreakInside: "avoid",
              minHeight: "220px",
            }}
          >
            <i className="bi bi-lightbulb-fill text-3xl mb-3" style={{ color: "#2563eb" }} />
            <p className="text-2xl font-extrabold leading-relaxed">
              <span style={{ color: "#1e3a8a" }}>
                {language === "mr"
                  ? "शिकण्याची प्रत्येक पद्धत"
                  : "Every learning style"}
              </span>
              <br />
              <span style={{ color: "#2563eb" }}>
                {language === "mr"
                  ? "तुमचे प्रावीण्य वाढवते"
                  : "leads to mastery"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
