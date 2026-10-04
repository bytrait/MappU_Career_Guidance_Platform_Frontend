import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

import "bootstrap-icons/font/bootstrap-icons.css";
import aptitudeTraits from "../../data/aptitude_traits_v2.json";
import AptitudeImg from "../../assets/aptitude.png";

/* ---------------- CONSTANTS ---------------- */

const APT_CODES = {
  NA: "Numerical Ability",
  MR: "Mechanical Reasoning",
  LA: "Language Ability",
  LR: "Logical Reasoning",
  SA: "Spatial Ability",
};

const APT_DISPLAY = {
  NA: { en: "Numerical Ability", mr: "सांख्यिक क्षमता" },
  MR: { en: "Mechanical Reasoning", mr: "यांत्रिक तर्क" },
  LA: { en: "Language Ability", mr: "भाषिक क्षमता" },
  LR: { en: "Logical Reasoning", mr: "तार्किक तर्क" },
  SA: { en: "Spatial Ability", mr: "स्थानिक क्षमता" },
};

/* ---------------- HELPERS ---------------- */

function getCategory(code, score) {
  const fullName = APT_CODES[code];
  const info = aptitudeTraits?.aptitudes?.[fullName];
  if (!info) return null;

  return info.categories.find((c) => {
    const [min, max] = c.range.split("-").map(Number);
    return score >= min && score <= max;
  });
}

/* ---------------- CARD ---------------- */

function AptitudeCard({ trait, language }) {
  const c = trait.content;
  if (!c) return null;

  const short = (list) => (Array.isArray(list) ? list.slice(0, 2).join(", ") : list || "");
  const isGood = trait.level?.toLowerCase().includes("good") || trait.level?.toLowerCase().includes("strong");

  return (
    <div
      className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between"
      style={{ pageBreakInside: "avoid", boxSizing: "border-box" }}
    >
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-semibold text-[15px] flex items-center" style={{ color: "#1e3a8a" }}>
            <i className="bi bi-bar-chart-line mr-2" style={{ color: "#2563eb" }}></i>
            {trait.title}
          </h3>

          <div
            className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold border"
            style={{
              backgroundColor: isGood ? "#ecfdf5" : "#fffbeb",
              color: isGood ? "#047857" : "#b45309",
              borderColor: isGood ? "#a7f3d0" : "#fde68a",
            }}
          >
            {trait.level}
          </div>
        </div>

        <div
          className="rounded-xl p-2.5 mb-2.5 border"
          style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}
        >
          <p className="text-xs leading-relaxed font-medium" style={{ color: "#1e293b" }}>
            {c.meaning?.[language]}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2.5">
          <div
            className="rounded-lg p-2 border"
            style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}
          >
            <p className="text-[11px] font-semibold mb-0.5" style={{ color: "#64748b" }}>
              {language === "mr" ? "वर्तन" : "Behavior"}
            </p>
            <p className="text-xs font-medium line-clamp-2" style={{ color: "#334155" }}>
              {short(c.how_it_shows?.[language])}
            </p>
          </div>

          <div
            className="rounded-lg p-2 border"
            style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}
          >
            <p className="text-[11px] font-semibold mb-0.5" style={{ color: "#64748b" }}>
              {language === "mr" ? "ताकद" : "Strength"}
            </p>
            <p className="text-xs font-medium line-clamp-2" style={{ color: "#334155" }}>
              {short(c.strengths?.[language])}
            </p>
          </div>
        </div>

        <div
          className="rounded-xl p-2.5 mb-2.5 border"
          style={{ backgroundColor: "#eff6ff", borderColor: "#bfdbfe" }}
        >
          <p className="text-[11px] font-bold mb-0.5" style={{ color: "#1e3a8a" }}>Growth</p>
          <p className="text-xs font-semibold" style={{ color: "#1d4ed8" }}>
            {short(c.growth_suggestions?.[language])}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100 mt-1">
        <p className="text-[11px] font-medium" style={{ color: "#64748b" }}>Reflection</p>
        <p className="text-xs italic" style={{ color: "#475569" }}>
          {c.reflection_prompts?.[language]?.[0]}
        </p>
      </div>
    </div>
  );
}

/* ---------------- MAIN (2 CLEAN PAGES) ---------------- */

export default function PrintableAptitudeStrengthsA4({
  scores = [],
  language = "en",
}) {
  const [chartData, setChartData] = useState([]);
  const [traits, setTraits] = useState([]);

  useEffect(() => {
    if (!scores.length) return;

    const aptitudeScores = scores.filter(
      (s) => s.assessmentType === "APTITUDE"
    );

    const ordered = ["NA", "MR", "LA", "LR", "SA"];

    const chart = ordered.map((code) => {
      const item = aptitudeScores.find(
        (i) => i.traitOrCategoryCode === code
      );

      return {
        name: APT_DISPLAY[code][language],
        score: item?.score || 0,
      };
    });

    setChartData(chart);

    const list = ordered.map((code) => {
      const item = aptitudeScores.find(
        (i) => i.traitOrCategoryCode === code
      );

      const score = item?.score || 0;
      const cat = getCategory(code, score);

      return {
        code,
        title: APT_DISPLAY[code][language],
        level: cat?.label?.[language] || cat?.label?.en,
        content: cat?.content,
      };
    });

    setTraits(list);
  }, [scores, language]);

  const page1Traits = traits.slice(0, 2);
  const page2Traits = traits.slice(2);

  return (
    <>
      {/* ---------------- PAGE 1 of Aptitude (Report Page 7) ---------------- */}
      <div
        className="print-page font-sans"
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
        <div className="text-center mb-4">
          <div className="flex justify-center items-center gap-3 mb-1">
            <i className="bi bi-graph-up-arrow text-3xl" style={{ color: "#2563eb" }} />
            <h1 className="text-3xl font-bold" style={{ color: "#1e3a8a" }}>
              {language === "mr" ? "तुमच्या क्षमता" : "Your Learning Abilities"}
            </h1>
          </div>

          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            {language === "mr"
              ? "या गुणांमुळे तुम्हाला कोणत्या गोष्टी सहज जमतात ते समजते."
              : "These scores show what skills come naturally to you."}
          </p>

          <div className="mt-3 mb-3">
            <hr style={{ border: "none", height: 1, backgroundColor: "#e2e8f0" }} />
          </div>

          <p className="text-xs text-gray-600 max-w-2xl mx-auto">
            {language === "mr"
              ? "हा विभाग तुमच्या क्षमता चाचणीवर आधारित ताकदी आणि सुधारण्याच्या क्षेत्रांना दाखवतो, ज्यामुळे योग्य करिअर निवडता येते."
              : "This section shows your strengths and areas to improve, helping identify careers that suit you best."}
          </p>
        </div>

        {/* TOP SECTION (CHART + IMAGE) */}
        <div className="grid grid-cols-12 gap-4 items-center mb-4">
          {/* CHART */}
          <div className="col-span-8 flex justify-center">
            <BarChart
              width={380}
              height={200}
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
            >
              <CartesianGrid stroke="#f1f5f9" />
              <XAxis dataKey="name" interval={0} angle={-15} textAnchor="end" height={45} tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="score" fill="#2563eb" isAnimationActive={false}>
                <LabelList dataKey="score" position="middle" fill="white" fontSize={11} />
              </Bar>
            </BarChart>
          </div>

          {/* IMAGE */}
          <div className="col-span-4 flex justify-center">
            <img
              src={AptitudeImg}
              alt="aptitude"
              className="w-[200px] h-[180px] object-contain"
            />
          </div>
        </div>

        {/* SUBTITLE */}
        <div className="w-full mb-3">
          <h3 className="text-xl font-bold" style={{ color: "#1e3a8a" }}>
            {language === "mr" ? "तुमच्या क्षमता तपशील" : "Your Aptitude Strengths"}
          </h3>
        </div>

        {/* FIRST 2 CARDS */}
        <div className="grid grid-cols-2 gap-4">
          {page1Traits.map((t) => (
            <AptitudeCard key={t.code} trait={t} language={language} />
          ))}
        </div>
      </div>

      {/* ---------------- PAGE 2 of Aptitude (Report Page 8) ---------------- */}
      <div
        className="print-page font-sans"
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
              {language === "mr" ? "क्षमता तपशील (भाग २)" : "Aptitude & Cognitive Strengths (Part 2)"}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {language === "mr" ? "सविस्तर विश्लेषण" : "Detailed Insights"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {page2Traits.map((t) => (
            <AptitudeCard key={t.code} trait={t} language={language} />
          ))}

          {/* MOTIVATION */}
          <div
            className="rounded-2xl p-6 flex flex-col items-center justify-center text-center border"
            style={{
              backgroundColor: "#eff6ff",
              borderColor: "#bfdbfe",
              pageBreakInside: "avoid",
              minHeight: "220px",
            }}
          >
            <i className="bi bi-graph-up-arrow text-3xl mb-3" style={{ color: "#2563eb" }} />
            <p className="text-2xl font-extrabold leading-relaxed">
              <span style={{ color: "#1e3a8a" }}>
                {language === "mr" ? "तुमच्या क्षमता हीच तुमची ताकद आहे" : "Your abilities are your strengths"}
              </span>
              <br />
              <span style={{ color: "#2563eb" }}>
                {language === "mr" ? "त्या सतत सुधारत राहा" : "Keep improving them"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}