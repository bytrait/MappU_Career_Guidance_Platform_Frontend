// src/components/report/AptitudeStrengths.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import "bootstrap-icons/font/bootstrap-icons.css";
import aptitudeTraits from "../../data/aptitude_traits_v2.json";
import AptitudeImg from "../../assets/aptitude.png";

// Mapping
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

// 🔥 Get full content
function getCategory(code, score) {
  const fullName = APT_CODES[code];
  const info = aptitudeTraits?.aptitudes?.[fullName];
  if (!info) return null;

  return info.categories.find((c) => {
    const [min, max] = c.range.split("-").map(Number);
    return score >= min && score <= max;
  });
}

// 🔥 SAME CARD DESIGN AS OTHERS
function AptitudeCard({ trait, language }) {
  const c = trait.content;
  if (!c) return null;

  const short = (list) => list?.slice(0, 2).join(", ");

  return (
    <div className="bg-white rounded-2xl p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-primary font-semibold text-xl flex items-center">
          <i className="bi bi-bar-chart-line mr-2"></i>
          {trait.title}
        </h3>

        <div className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
          {trait.level}
        </div>
      </div>

      {/* MEANING */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
        <p className="text-gray-800 text-base leading-relaxed font-medium">
          {c.meaning?.[language]}
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 flex items-center">
            <i className="bi bi-eye mr-1"></i>
            {language === "mr" ? "वर्तन" : "Behavior"}
          </p>
          <p className="text-gray-700 text-sm font-medium">
            {short(c.how_it_shows?.[language])}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 flex items-center">
            <i className="bi bi-lightbulb mr-1"></i>
            {language === "mr" ? "कौशल्य" : "Strength"}
          </p>
          <p className="text-gray-700 text-sm font-medium">
            {short(c.strengths?.[language])}
          </p>
        </div>

      </div>

      {/* GROWTH */}
      <div className="bg-accent-light border border-primary-light rounded-xl p-4 mb-4">
        <p className="text-sm text-primary mb-1 flex items-center font-semibold">
          <i className="bi bi-graph-up mr-1"></i>
          {language === "mr" ? "सुधारणा" : "Growth"}
        </p>
        <p className="text-default font-semibold text-sm">
          {short(c.growth_suggestions?.[language])}
        </p>
      </div>

      {/* REFLECTION */}
      <div className="pt-2 border-t border-gray-100">
        <p className="text-sm text-gray-500 mb-1 flex items-center">
          <i className="bi bi-question-circle mr-1"></i>
          {language === "mr" ? "विचार करा" : "Reflection"}
        </p>
        <p className="text-sm text-gray-700">
          {c.reflection_prompts?.[language]?.[0]}
        </p>
      </div>
    </div>
  );
}

export default function AptitudeStrengths({ scores = [], language = "en" }) {
  const [chartData, setChartData] = useState([]);
  const [traits, setTraits] = useState([]);

  useEffect(() => {
    if (!scores.length) return;

    const aptitudeScores = scores.filter(
      (s) => s.assessmentType === "APTITUDE"
    );

    const ordered = ["NA", "MR", "LA", "LR", "SA"];

    // Chart
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

    // Traits
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
    <div className="w-full flex flex-col items-center">

      {/* HEADER */}
      <div className="max-w-7xl w-full px-2">
        <h2 className="text-3xl font-semibold text-primary">
          {language === "mr"
            ? "तुमच्या क्षमता सामर्थ्य"
            : "Your Aptitude Strengths"}
        </h2>
        <p className="text-muted mt-2">
          {language === "mr"
            ? "हे गुण तुमच्या नैसर्गिक क्षमतांबद्दल माहिती देतात."
            : "These scores reflect your natural abilities."}
        </p>
      </div>

      {/* TOP */}
      <div className="max-w-7xl w-full mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* CHART */}
        <div className="w-full h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid stroke="#e5e7eb" />

              <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" height={70} />

              <YAxis domain={[0, 10]} />

              <Tooltip cursor={{ fill: "transparent" }} />

              <Bar dataKey="score" fill="#2563eb" radius={[6, 6, 0, 0]}>
                <LabelList dataKey="score" position="middle" fill="white" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center">
          <img
            src={AptitudeImg}
            alt="aptitude"
            className="w-full max-w-[500px] h-[420px] object-contain"
          />
        </div>
      </div>

      {/* CARDS */}
      <div className="max-w-7xl w-full mt-10 grid sm:grid-cols-2 gap-6 px-2">

        {traits.map((t) => (
          <AptitudeCard key={t.code} trait={t} language={language} />
        ))}

        {/* MOTIVATION */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-center text-center">
          <p className="text-xl sm:text-4xl font-bold">

            <span className="text-primary">
              {language === "mr"
                ? "तुमच्या क्षमता तुमची ताकद आहेत"
                : "Your abilities are your strengths"}
            </span>

            <br />

            <span className="bg-accent text-transparent bg-clip-text">
              {language === "mr"
                ? "त्यांना विकसित करा"
                : "Keep improving them"}
            </span>

          </p>
        </div>

      </div>
    </div>
  );
}