import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
} from "recharts";

import riasecData from "../../data/riasec_interests_v2.json";
import InterestImg from "../../assets/interest.png";

/* ---------------- UI ---------------- */

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

/* ---------------- CARD (UNCHANGED DESIGN) ---------------- */

function InterestCard({ trait, language }) {
  const c = trait.content;
  if (!c) return null;

  const renderShort = (list) => list?.slice(0, 2).join(", ");

  return (
    <div
      className="bg-white border border-gray-50 rounded-2xl p-5"
      style={{ pageBreakInside: "avoid" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-primary font-semibold text-lg flex items-center">
          <i className="bi bi-compass mr-2"></i>
          {trait.name?.[language] || trait.name?.en}
        </h3>

        <div className="text-xs bg-surface text-primary px-2 py-1 rounded-full font-medium">
          {trait.code}
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
            {renderShort(c.how_it_shows?.[language])}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
          <p className="text-gray-500 text-xs mb-1">Learning</p>
          <p className="text-gray-700 text-xs">
            {renderShort(c.learning_preference?.[language])}
          </p>
        </div>
      </div>

      <div className="bg-accent-light border border-primary-light rounded-xl p-3 mb-3">
        <p className="text-xs text-primary mb-1">Strength</p>
        <p className="text-default text-xs font-semibold">
          {renderShort(c.strengths?.[language])}
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

export default function PrintableCareerInterestsA4({
  scores = [],
  language = "en",
}) {
  const [data, setData] = useState([]);
  const [topInterests, setTopInterests] = useState([]);

  useEffect(() => {
    if (!scores?.length) return;

    const riasecScores = scores.filter(
      (item) => item.assessmentType === "RIASEC"
    );

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

    const top3 = [...riasecScores]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) =>
        riasecData.riasec.find((t) => t.code === item.traitOrCategoryCode)
      );

    setTopInterests(top3);
  }, [scores, language]);

  return (
    <div
      style={{
        width: "210mm",
        padding: "10mm",
        background: "#fff",
      }}
      className="mt-8"
    >
      {/* HEADER */}
       <div className="text-center mb-10">
        {/* Icon + Title */}
        <div className="flex justify-center items-center gap-4 mb-2">
          <i className="bi bi-compass text-4xl text-primary" />

          <h1 className="text-4xl font-bold text-primary tracking-tight">
            {UI_TEXT[language]?.heading}
          </h1>
        </div>


        {/* Description */}
        <p className="text-sm text-muted max-w-xl mx-auto leading-relaxed">
          {UI_TEXT[language]?.description}
        </p>
        {/* light horizontal line */}
        <div className="mt-6 mb-6">
          <hr
            style={{ border: "none", height: 1, backgroundColor: "#eef2f7" }}
          />
        </div>
      </div>

      {/* TOP SECTION (FORCED 2 COLUMN) */}
      <div className="grid grid-cols-12 gap-4 items-center">

        {/* CHART BIG */}
        <div className="col-span-8 flex justify-center">
          <RadarChart
            width={420}
            height={320}
            outerRadius={110}
            data={data}
          >
            <PolarGrid />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 11 }}
            />
            <Tooltip />
            <Radar
              dataKey="value"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.6}
              isAnimationActive={false}
            />
          </RadarChart>
        </div>

        {/* IMAGE SMALL */}
        <div className="col-span-4 flex justify-center">
          <img
            src={InterestImg}
            alt="interest"
            className="w-[240px] h-[220px] object-contain"
          />
        </div>

      </div>

      {/* CARDS */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-primary mb-4">
          {UI_TEXT[language]?.section}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {topInterests.map((t) => (
            <InterestCard key={t.code} trait={t} language={language} />
          ))}

          {/* Motivation (UNCHANGED) */}
          <div className="bg-white border border-gray-50 rounded-2xl p-5 flex items-center justify-center text-center">
            <p className="text-5xl font-bold leading-relaxed">
              <span className="text-primary">
                Your interests shape your path
              </span>
              <br />
              <span className="text-accent bg-clip-text">
                Follow what excites you
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}