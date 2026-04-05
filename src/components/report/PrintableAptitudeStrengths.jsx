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

/* ---------------- CARD (UNCHANGED) ---------------- */

function AptitudeCard({ trait, language }) {
  const c = trait.content;
  if (!c) return null;

  const short = (list) => list?.slice(0, 2).join(", ");

  return (
    <div
      className="bg-white border border-gray-50 rounded-2xl p-5"
      style={{ pageBreakInside: "avoid" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-primary font-semibold text-lg flex items-center">
          <i className="bi bi-bar-chart-line mr-2"></i>
          {trait.title}
        </h3>

        <div className="text-xs bg-surface text-primary px-2 py-1 rounded-full font-medium">
          {trait.level}
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
        <p className="text-gray-800 text-sm leading-relaxed font-medium">
          {c.meaning?.[language]}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
          <p className="text-gray-500 text-xs mb-1">Behavior</p>
          <p className="text-gray-700 text-xs">
            {short(c.how_it_shows?.[language])}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
          <p className="text-gray-500 text-xs mb-1">Strength</p>
          <p className="text-gray-700 text-xs">
            {short(c.strengths?.[language])}
          </p>
        </div>
      </div>

      <div className="bg-accent-light border border-primary-light rounded-xl p-3 mb-3">
        <p className="text-xs text-primary font-semibold mb-1">Growth</p>
        <p className="text-default font-semibold text-xs">
          {short(c.growth_suggestions?.[language])}
        </p>
      </div>

      <div className="pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-1">Reflection</p>
        <p className="text-xs text-gray-700">
          {c.reflection_prompts?.[language]?.[0]}
        </p>
      </div>
    </div>
  );
}

/* ---------------- MAIN ---------------- */

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

  return (
    <div
      style={{
        width: "210mm",
        padding: "10mm",
        background: "#fff",
      }}
      className="print:break-inside-avoid"
    >
      {/* HEADER */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3">
          <i className="bi bi-graph-up-arrow text-4xl text-primary" />
          <h1 className="text-4xl font-bold text-primary">
            {language === "mr" ? "तुमच्या क्षमता" : "Your Learning Abilities"}
          </h1>
        </div>
        <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
          {language === "mr"
            ? "या गुणांमुळे तुम्हाला कोणत्या गोष्टी सहज जमतात ते समजते."
            : "These scores show what skills come naturally to you."}
        </p>
        {/* light horizontal line */}
        <div className="mt-6 mb-6">
          <hr
            style={{ border: "none", height: 1, backgroundColor: "#eef2f7" }}
          />
        </div>
        <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
          {language === "mr"
            ? "हा विभाग तुमच्या क्षमता चाचणीवर आधारित ताकदी आणि सुधारण्याच्या क्षेत्रांना दाखवतो, ज्यामुळे योग्य करिअर निवडता येते."
            : "This section shows your strengths and areas to improve, helping identify careers that suit you best."}
        </p>
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-12 gap-4 items-center">

        {/* CHART BIG */}
        <div className="col-span-8 flex justify-center">
          <BarChart
            width={440}
            height={300}
            data={chartData}
          >
            <CartesianGrid stroke="#e5e7eb" />
            <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" height={70} fontSize={11} />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Bar dataKey="score" fill="#2563eb" isAnimationActive={false}>
              <LabelList dataKey="score" position="middle" fill="white" />
            </Bar>
          </BarChart>
        </div>

        {/* IMAGE */}
        <div className="col-span-4 flex justify-center">
          <img
            src={AptitudeImg}
            alt="aptitude"
            className="w-[240px] h-[220px] object-contain"
          />
        </div>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {traits.map((t) => (
          <AptitudeCard key={t.code} trait={t} language={language} />
        ))}

        {/* MOTIVATION */}
        <div className="bg-white border border-gray-50 rounded-2xl p-5 flex items-center justify-center text-center">
          <p className="text-5xl font-bold">
            <span className="text-primary">
              Your abilities are your strength
            </span>
            <br />
            <span className="text-accent bg-clip-text">
              Keep improving them
            </span>
          </p>
        </div>
      </div>

    </div>
  );
}