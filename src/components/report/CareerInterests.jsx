// src/components/CareerInterests.jsx
import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import riasecData from "../../data/riasec_interests_v2.json";
import InterestImg from "../../assets/interest.png";

// UI text
const UI_TEXT = {
  en: {
    heading: "Your Career Interests",
    description: "These are your top interest areas based on your responses.",
    section: "Your Top Interests",
  },
  mr: {
    heading: "तुमच्या करिअर आवडी",
    description: "तुमच्या प्रतिसादांवर आधारित तुमच्या मुख्य आवडी खाली दिल्या आहेत.",
    section: "तुमच्या प्रमुख आवडी",
  },
};

// helper
function getTraitInfo(code) {
  return riasecData.riasec.find((t) => t.code === code);
}

// 🔥 SAME DESIGN AS PERSONALITY
function InterestCard({ trait, language }) {
  const c = trait.content;
  if (!c) return null;

  const renderShort = (list) => list?.slice(0, 2).join(", ");

  return (
    <div className="bg-white rounded-2xl p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-primary font-semibold text-xl flex items-center">
          <i className="bi bi-compass mr-2"></i>
          {trait.name?.[language] || trait.name?.en}
        </h3>

        <div className="text-xs bg-surface text-primary px-3 py-1 rounded-full font-medium">
          {trait.code}
        </div>
      </div>

      {/* MEANING */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
        <p className="text-gray-800 text-base leading-relaxed font-medium">
          {c.meaning?.[language]}
        </p>
      </div>

      {/* QUICK GRID */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 flex items-center">
            <i className="bi bi-eye mr-1"></i>
            {language === "mr" ? "वर्तन" : "Behavior"}
          </p>
          <p className="text-gray-700 font-medium text-sm">
            {renderShort(c.how_it_shows?.[language])}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 flex items-center">
            <i className="bi bi-book mr-1"></i>
            {language === "mr" ? "शिकणे" : "Learning"}
          </p>
          <p className="text-gray-700 font-medium text-sm">
            {renderShort(c.learning_preference?.[language])}
          </p>
        </div>

      </div>

      {/* STRENGTH */}
      <div className="bg-accent-light border border-primary-light rounded-xl p-4 mb-6">
        <p className="text-sm text-primary font-semibold mb-1 flex items-center">
          <i className="bi bi-stars mr-1"></i>
          {language === "mr" ? "तुमची ताकद" : "Your Strength"}
        </p>
        <p className="text-default text-sm font-semibold">
          {renderShort(c.strengths?.[language])}
        </p>
      </div>

      {/* REFLECTION */}
      <div className="pt-3 border-t border-gray-100">
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

export default function CareerInterests({ scores = [], language = "en" }) {
  const [data, setData] = useState([]);
  const [topInterests, setTopInterests] = useState([]);

  useEffect(() => {
    if (!scores?.length) return;

    const riasecScores = scores.filter(
      (item) => item.assessmentType === "RIASEC"
    );

    // Chart data (UNCHANGED)
    const chartData = riasecData.riasec.map((trait) => {
      const item = riasecScores.find(
        (s) => s.traitOrCategoryCode === trait.code
      );
      return {
        subject: trait.name?.[language] || trait.name?.en,
        value: item ? item.score : 0,
      };
    });

    setData(chartData);

    // Top 3
    const top3 = [...riasecScores]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => getTraitInfo(item.traitOrCategoryCode));

    setTopInterests(top3);
  }, [scores, language]);

  return (
    <div className="w-full p-6 flex flex-col items-center bg-gray-50 border border-gray-200 rounded-sm">

      {/* Header */}
      <div className="max-w-7xl w-full">
        <h2 className="text-3xl font-semibold text-primary">
          {UI_TEXT[language]?.heading}
        </h2>
        <p className="text-muted mt-2">
          {UI_TEXT[language]?.description}
        </p>
      </div>

      {/* TOP: Chart + Image */}
      <div className="max-w-7xl w-full mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Chart (UNCHANGED) */}
        <div className="w-full h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius={120}>
              <PolarGrid />

              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fontSize: 14,
                  fill: "#374151",
                }}
              />

              <Tooltip />

              <Radar
                name="RIASEC"
                dataKey="value"
                stroke="#2563eb"
                fill="#2563eb"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Image */}
        <div className="w-full flex justify-center">
          <img
            src={InterestImg}
            alt="interest"
            className="w-full max-w-[500px] h-[420px] object-contain"
          />
        </div>
      </div>

      {/* BOTTOM: Cards */}
      <div className="max-w-7xl w-full mt-10 px-2">

        <h3 className="text-2xl font-semibold text-primary mb-6">
          {UI_TEXT[language]?.section}
        </h3>

        <div className="grid sm:grid-cols-2 gap-6">

          {topInterests.map((t) => (
            <InterestCard key={t.code} trait={t} language={language} />
          ))}

          {/* Motivation Card */}
          <div className="bg-white border border-gray-50 rounded-2xl p-6 flex items-center justify-center text-center">
            <p className="text-xl sm:text-4xl font-bold leading-relaxed">

              <span className="text-primary">
                {language === "mr"
                  ? "तुमच्या आवडी तुमचा मार्ग ठरवतात"
                  : "Your interests shape your path"}
              </span>

              <br />

              <span className="bg-accent text-transparent bg-clip-text">
                {language === "mr"
                  ? "त्यांचा पाठपुरावा करा"
                  : "Follow what excites you"}
              </span>

            </p>
          </div>

        </div>
      </div>

    </div>
  );
}