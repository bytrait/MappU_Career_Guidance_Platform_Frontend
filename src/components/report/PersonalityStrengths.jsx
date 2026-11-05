// src/components/report/PersonalityStrengths.jsx
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

/* ---------------- TRAIT CARD (PURE ENGLISH REVIEWED CONTENT) ---------------- */

function TraitCard({ trait }) {
  const cat = trait.category || trait.content || {};
  const meaning = cat.meaning?.en || cat.meaning || "";
  const howItShows =
    typeof cat.how_it_shows === "string"
      ? cat.how_it_shows
      : Array.isArray(cat.how_it_shows?.en)
      ? cat.how_it_shows.en[0]
      : Array.isArray(cat.how_it_shows)
      ? cat.how_it_shows[0]
      : "";

  const learningStyle =
    cat.learning_preference?.style ||
    (Array.isArray(cat.learning_preference?.en)
      ? cat.learning_preference.en[0]
      : "");
  const learningQuote =
    cat.learning_preference?.quote ||
    (Array.isArray(cat.learning_preference?.en) &&
    cat.learning_preference.en.length > 1
      ? cat.learning_preference.en[1]
      : "");

  const strengths = cat.strengths?.en || cat.strengths || [];
  const growthList =
    cat.growth_suggestions?.en || cat.growth_suggestions || [];
  const prompt =
    cat.reflection_prompt ||
    (Array.isArray(cat.reflection_prompts?.en)
      ? cat.reflection_prompts.en[0]
      : "");
  const archetype =
    typeof cat.archetype === "string"
      ? cat.archetype
      : cat.archetype?.en || trait.label || "";
  const level = cat.level || cat.range || "";

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        {/* HEADER: Trait Name + Archetype Badge + Level Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1e3a8a] flex items-center justify-center text-sm font-semibold border border-blue-100">
              <i className="bi bi-person-badge-fill" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1e3a8a]">
                {trait.title || trait.code}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold bg-blue-50 text-[#1e3a8a] border border-blue-200/70">
              {archetype}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
              {level}
            </span>
          </div>
        </div>

        {/* 1. WHAT THIS MEANS FOR YOU */}
        <div className="bg-slate-50/80 rounded-xl p-4 mb-4 border border-slate-200/70">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <i className="bi bi-info-circle text-blue-600" />
            What This Means for You
          </p>
          <p className="text-slate-800 text-sm leading-relaxed font-medium">
            {meaning}
          </p>
        </div>

        {/* 2. HOW THIS SHOWS UP & LEARNING PREFERENCE (2-COL) */}
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          {/* Behavior / How It Shows Up */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                <i className="bi bi-eye text-blue-600" />
                How This Shows Up
              </p>
              <p className="text-slate-700 font-medium text-xs sm:text-sm leading-snug">
                {howItShows}
              </p>
            </div>
          </div>

          {/* Learning Preference */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                <i className="bi bi-journal-check text-blue-600" />
                Learning Preference
              </p>
              <p className="text-slate-800 font-semibold text-xs sm:text-sm leading-snug">
                {learningStyle}
              </p>
              {learningQuote && (
                <p className="text-xs text-slate-500 italic mt-1.5 leading-snug">
                  {learningQuote}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 3. KEY STRENGTHS */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 mb-4">
          <p className="text-xs font-bold text-[#1e3a8a] mb-1.5 flex items-center gap-1.5">
            <i className="bi bi-star-fill text-blue-600 text-xs" />
            Key Strengths
          </p>
          <div className="flex flex-wrap gap-1.5">
            {Array.isArray(strengths)
              ? strengths.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white text-blue-900 border border-blue-200 shadow-2xs"
                  >
                    {s}
                  </span>
                ))
              : strengths}
          </div>
        </div>
      </div>

      {/* 4. GROWTH SUGGESTIONS & REFLECTION PROMPT */}
      <div className="pt-3 border-t border-slate-100">
        {growthList.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <i className="bi bi-arrow-up-right-circle text-emerald-600" />
              Growth Suggestions
            </p>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 pl-3 list-disc">
              {growthList.map((item, idx) => (
                <li key={idx} className="leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {prompt && (
          <div className="pt-2.5 border-t border-slate-100 bg-amber-50/50 rounded-lg p-2.5 border border-amber-200/60 text-xs text-slate-700">
            <span className="font-bold text-amber-800 flex items-center gap-1 mb-0.5">
              <i className="bi bi-lightbulb-fill text-amber-600" />
              Reflection Prompt:
            </span>
            <p className="italic text-slate-700 leading-snug">{prompt}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function PersonalityStrengths({ scores = [] }) {
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
        title: TRAIT_DISPLAY[code],
        label: cat?.archetype || "",
        category: cat,
        content: cat?.content || cat,
        score,
      };
    });

    setTraits(list);
  }, [scores]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="max-w-7xl w-full px-0 sm:px-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#1e3a8a]">
              Your Personality Snapshot
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              Understanding how you think, act, learn, and collaborate across the Big Five dimensions.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Top Section: Graphic + Chart */}
        <div className="grid lg:grid-cols-2 gap-8 items-center my-6">
          <div className="w-full flex justify-center">
            <img
              src={PersonalityImg}
              alt="Personality Dimensions"
              className="w-full max-w-[450px] h-[380px] object-contain"
            />
          </div>

          <div className="w-full h-[380px] bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="pb-2 border-b border-slate-100">
              <h4 className="font-bold text-slate-800 text-sm">
                Big Five Personality Score Distribution
              </h4>
              <p className="text-xs text-slate-500">
                Your relative baseline across the 5 core dimensions
              </p>
            </div>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 15, right: 20, left: -25, bottom: 20 }}
                >
                  <CartesianGrid stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    interval={0}
                    height={50}
                    tick={{
                      fontSize: 12,
                      fill: "#475569",
                      fontWeight: 600,
                    }}
                  />
                  <YAxis tick={{ fontSize: 11, fill: "#64748b" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e3a8a",
                      color: "#ffffff",
                      borderRadius: "8px",
                      border: "none",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]}>
                    <LabelList
                      dataKey="value"
                      position="middle"
                      fill="white"
                      fontWeight="bold"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Section Subtitle */}
        <div className="max-w-7xl w-full mt-8 mb-6 px-2">
          <h3 className="text-2xl font-bold text-[#1e3a8a]">
            Your Personality Insights & Learning Style
          </h3>
          <p className="text-slate-500 mt-1 text-sm">
            In-depth analysis of each dimension, archetype, behavioral defaults, and actionable growth steps.
          </p>
        </div>

        {/* Trait Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {traits.map((t) => (
            <TraitCard key={t.code} trait={t} />
          ))}

          {/* 6th Card (Motivation) */}
          <div
            className="rounded-2xl p-6 flex flex-col items-center justify-center text-center border shadow-sm h-full"
            style={{
              backgroundColor: "#eff6ff",
              borderColor: "#bfdbfe",
              minHeight: "220px",
            }}
          >
            <i className="bi bi-stars text-4xl mb-3" style={{ color: "#2563eb" }} />
            <p className="text-2xl sm:text-4xl font-extrabold leading-relaxed">
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
    </div>
  );
}