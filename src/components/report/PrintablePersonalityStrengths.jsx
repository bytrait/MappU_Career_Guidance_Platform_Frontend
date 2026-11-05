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

import traitsData from "../../data/personality_traits_v2.json";
import PersonalityImg from "../../assets/personality.png";

/* ---------------- CONSTANTS ---------------- */

const TRAIT_JSON_KEY = {
  O: "Openness",
  C: "Conscientiousness",
  E: "Extraversion",
  A: "Agreeableness",
  N: "Emotional Stability",
};

const TRAIT_DISPLAY = {
  O: "Openness",
  C: "Conscientiousness",
  E: "Extraversion",
  A: "Agreeableness",
  N: "Emotional Stability",
};

/* ---------------- HELPERS ---------------- */

function getCategory(traitJsonKey, score) {
  let traitInfo = traitsData?.traits?.[traitJsonKey];

  if (!traitInfo) {
    const alt = {
      Extroversion: "Extraversion",
      Extraversion: "Extroversion",
      Neuroticism: "Emotional Stability",
      "Emotional Stability": "Neuroticism",
    };
    traitInfo = traitsData?.traits?.[alt[traitJsonKey]];
  }

  if (!traitInfo) return null;

  // 1. Direct match on 0-40 scale (if score > 30)
  if (score > 30) {
    const found = traitInfo.categories.find(
      (c) => score >= c.level_score.min && score <= c.level_score.max
    );
    if (found) return found;
  }

  // 2. Normalization for 0-30 scale from assessment scoring
  const scaledScore = Math.round((score / 30) * 40);
  const scaledFound = traitInfo.categories.find(
    (c) => scaledScore >= c.level_score.min && scaledScore <= c.level_score.max
  );
  if (scaledFound) return scaledFound;

  // 3. Fallback direct match
  const directFound = traitInfo.categories.find(
    (c) => score >= c.level_score.min && score <= c.level_score.max
  );
  return directFound || traitInfo.categories[0];
}

/* ---------------- TRAIT CARD (DESIGNED FOR NEW REVIEWED OCEAN) ---------------- */

function TraitCard({ trait }) {
  const cat = trait.category || trait.content || {};
  const meaning = cat.meaning?.en || cat.meaning || "";
  const howItShows = typeof cat.how_it_shows === "string" 
    ? cat.how_it_shows 
    : (Array.isArray(cat.how_it_shows?.en) ? cat.how_it_shows.en[0] : (Array.isArray(cat.how_it_shows) ? cat.how_it_shows[0] : ""));
  
  const learningStyle = cat.learning_preference?.style || 
    (Array.isArray(cat.learning_preference?.en) ? cat.learning_preference.en[0] : "");
  const learningQuote = cat.learning_preference?.quote || 
    (Array.isArray(cat.learning_preference?.en) && cat.learning_preference.en.length > 1 ? cat.learning_preference.en[1] : "");

  const strengths = cat.strengths?.en || cat.strengths || [];
  const growthList = cat.growth_suggestions?.en || cat.growth_suggestions || [];
  const prompt = cat.reflection_prompt || (Array.isArray(cat.reflection_prompts?.en) ? cat.reflection_prompts.en[0] : "");
  const archetype = typeof cat.archetype === "string" ? cat.archetype : (cat.archetype?.en || trait.label || "");
  const level = cat.level || cat.range || "";

  return (
    <div
      className="bg-white border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs flex flex-col justify-between"
      style={{ pageBreakInside: "avoid", boxSizing: "border-box" }}
    >
      <div>
        {/* HEADER: Trait Name + Archetype Badge + Level */}
        <div className="flex items-center justify-between gap-1.5 mb-2 pb-1.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center text-xs">
              <i className="bi bi-person-badge-fill" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#1e3a8a] leading-tight">
                {trait.title || trait.code}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[9.5px] px-2 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-800 border border-blue-200/70">
              {archetype}
            </span>
            <span className="text-[8.5px] px-1.5 py-0.5 rounded-md font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
              {level}
            </span>
          </div>
        </div>

        {/* 1. WHAT THIS MEANS FOR YOU */}
        <div className="rounded-xl p-2.5 mb-2 border bg-slate-50/80 border-slate-100">
          <p className="text-[11px] leading-relaxed text-slate-800 font-medium">
            {meaning}
          </p>
        </div>

        {/* 2. HOW THIS SHOWS UP & LEARNING STYLE (2-COL GRID) */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {/* Behavior / How It Shows Up */}
          <div className="rounded-lg p-2 border bg-slate-50 border-slate-100 flex flex-col justify-between">
            <div>
              <p className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1 mb-1">
                <i className="bi bi-eye text-blue-600" />
                How This Shows Up
              </p>
              <p className="text-[10px] text-slate-700 font-medium leading-snug">
                {howItShows}
              </p>
            </div>
          </div>

          {/* Learning Style */}
          <div className="rounded-lg p-2 border bg-slate-50 border-slate-100 flex flex-col justify-between">
            <div>
              <p className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1 mb-1">
                <i className="bi bi-journal-check text-blue-600" />
                Learning Preference
              </p>
              <p className="text-[10px] text-slate-700 font-semibold leading-snug">
                {learningStyle}
              </p>
              {learningQuote && (
                <p className="text-[9.5px] text-slate-500 italic mt-0.5 leading-snug">
                  {learningQuote}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 3. KEY STRENGTHS */}
        <div className="rounded-xl px-2.5 py-1.5 mb-2 border bg-blue-50/60 border-blue-200/80">
          <div className="text-[10px] leading-snug">
            <span className="font-bold text-[#1e3a8a] inline-flex items-center gap-1 mr-1.5">
              <i className="bi bi-star-fill text-blue-600 text-[9px]" />
              Key Strengths:
            </span>
            <span className="font-semibold text-blue-900">
              {Array.isArray(strengths) ? strengths.join(" · ") : strengths}
            </span>
          </div>
        </div>
      </div>

      {/* 4. GROWTH SUGGESTIONS & REFLECTION PROMPT */}
      <div className="pt-1.5 border-t border-slate-100">
        {growthList.length > 0 && (
          <div className="mb-1.5">
            <p className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1 mb-0.5">
              <i className="bi bi-arrow-up-right-circle text-emerald-600" />
              Growth Suggestions
            </p>
            <ul className="text-[9.5px] text-slate-700 space-y-0.5 pl-3 list-disc">
              {growthList.map((item, idx) => (
                <li key={idx} className="leading-tight">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {prompt && (
          <div className="pt-1 border-t border-slate-100 text-[9.5px] text-slate-600 italic">
            <span className="font-bold text-slate-500 not-italic mr-1">Reflect:</span>
            {prompt}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- MAIN COMPONENT (2 STRICT A4 PAGES) ---------------- */

export default function PrintablePersonalityStrengthsA4({
  scores = [],
  language = "en",
}) {
  const [chartData, setChartData] = useState([]);
  const [traits, setTraits] = useState([]);

  useEffect(() => {
    if (!scores.length) return;

    const oceanScores = scores.filter((i) => i.assessmentType === "OCEAN");
    const ordered = ["O", "C", "E", "A", "N"];

    const chart = ordered.map((code) => {
      const item = oceanScores.find((s) => s.traitOrCategoryCode === code);
      return {
        name: TRAIT_DISPLAY[code],
        value: item?.score || 0,
      };
    });

    setChartData(chart);

    const list = ordered.map((code) => {
      const item = oceanScores.find((s) => s.traitOrCategoryCode === code);
      const score = item?.score || 0;

      const cat = getCategory(TRAIT_JSON_KEY[code], score);

      return {
        code,
        title: TRAIT_DISPLAY[code] || TRAIT_JSON_KEY[code],
        label: cat?.archetype || "",
        category: cat,
        content: cat?.content || cat,
        score,
      };
    });

    setTraits(list);
  }, [scores, language]);

  const page1Traits = traits.slice(0, 2);
  const page2Traits = traits.slice(2);

  return (
    <>
      {/* ---------------- PAGE 1 of Personality (Report Page 3) ---------------- */}
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
          <div className="flex justify-center items-center gap-3">
            <i className="bi bi-lightbulb text-yellow-500 text-3xl" />
            <h1 className="text-3xl font-bold" style={{ color: "#1e3a8a" }}>
              Your Personality Snapshot
            </h1>
          </div>

          <p className="text-base text-gray-500 mt-1">
            Understanding how you think, act, and learn
          </p>

          <div className="mt-3 mb-3">
            <hr style={{ border: "none", height: 1, backgroundColor: "#e2e8f0" }} />
          </div>

          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Let's explore your personality traits across the Big Five dimensions to understand your natural strengths, work preferences, and growth areas.
          </p>
        </div>

        {/* MAIN GRID - IMAGE + CHART */}
        <div className="grid grid-cols-12 gap-4 items-center mb-4">
          {/* IMAGE */}
          <div className="col-span-4 flex justify-center items-center">
            <img
              src={PersonalityImg}
              alt="personality"
              className="w-[200px] h-[180px] object-contain"
            />
          </div>

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
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" isAnimationActive={false}>
                <LabelList dataKey="value" position="middle" fill="white" fontSize={11} />
              </Bar>
            </BarChart>
          </div>
        </div>

        {/* SUBTITLE */}
        <div className="w-full mb-3">
          <h3 className="text-xl font-bold" style={{ color: "#1e3a8a" }}>
            Your Personality Insights
          </h3>
          <p className="text-xs text-gray-500">
            A deeper understanding of your core dimensions
          </p>
        </div>

        {/* TRAITS ROW (2 CARDS) */}
        <div className="grid grid-cols-2 gap-4">
          {page1Traits.map((t) => (
            <TraitCard key={t.code} trait={t} />
          ))}
        </div>
      </div>

      {/* ---------------- PAGE 2 of Personality (Report Page 4) ---------------- */}
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
              Personality Dimensions (Part 2)
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Detailed Insights
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {page2Traits.map((t) => (
            <TraitCard key={t.code} trait={t} />
          ))}

          {/* 6th Card (Motivation) */}
          <div
            className="rounded-2xl p-6 flex flex-col items-center justify-center text-center border shadow-2xs"
            style={{
              backgroundColor: "#eff6ff",
              borderColor: "#bfdbfe",
              pageBreakInside: "avoid",
              boxSizing: "border-box",
              minHeight: "220px",
            }}
          >
            <i className="bi bi-stars text-3xl mb-3" style={{ color: "#2563eb" }} />
            <p className="text-2xl font-extrabold leading-relaxed">
              <span style={{ color: "#1e3a8a" }}>
                Every trait you have
              </span>
              <br />
              <span style={{ color: "#2563eb" }}>
                is your strength
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}