import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList
} from "recharts";

import traitsData from "../../data/personality_traits_v2.json";
import PersonalityImg from "../../assets/personality.png";

/* ---------------- CONSTANTS ---------------- */

const TRAIT_JSON_KEY = {
  O: "Openness",
  C: "Conscientiousness",
  E: "Extroversion",
  A: "Agreeableness",
  N: "Neuroticism",
};

const TRAIT_DISPLAY = {
  O: { en: "Openness", mr: "मोकळेपणा" },
  C: { en: "Conscientiousness", mr: "कर्मठपणा" },
  E: { en: "Extroversion", mr: "बहिर्मुखता" },
  A: { en: "Agreeableness", mr: "सहमतता" },
  N: { en: "Neuroticism", mr: "भावनिक अस्थिरता" },
};

/* ---------------- HELPERS ---------------- */

function getCategory(traitJsonKey, score) {
  let traitInfo = traitsData?.traits?.[traitJsonKey];

  if (!traitInfo) {
    const alt = {
      Extroversion: "Extraversion",
      Extraversion: "Extroversion",
    };
    traitInfo = traitsData?.traits?.[alt[traitJsonKey]];
  }

  if (!traitInfo) return null;

  return traitInfo.categories.find(
    (c) => score >= c.level_score.min && score <= c.level_score.max
  );
}

/* ---------------- TRAIT CARD ---------------- */

function TraitCard({ trait, language }) {
  const c = trait.content;
  if (!c) return null;

  const renderShort = (list) => {
    if (!list) return "";
    if (Array.isArray(list)) return list.slice(0, 2).join(", ");
    return list;
  };

  const getLearningText = () => {
    if (!c.learning_preference?.[language]) return "";
    if (Array.isArray(c.learning_preference[language])) {
      return c.learning_preference[language][0];
    }
    return c.learning_preference[language];
  };

  return (
    <div
      className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between"
      style={{ pageBreakInside: "avoid", boxSizing: "border-box" }}
    >
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-semibold text-[15px] flex items-center" style={{ color: "#1e3a8a" }}>
            <i className="bi bi-person-lines-fill mr-2" style={{ color: "#2563eb" }}></i>
            {trait.label}
          </h3>

          <div
            className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold border"
            style={{ backgroundColor: "#eff6ff", color: "#1d4ed8", borderColor: "#bfdbfe" }}
          >
            {trait.title}
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
            <p className="text-xs font-medium" style={{ color: "#334155" }}>
              {renderShort(c.how_it_shows?.[language])}
            </p>
          </div>

          <div
            className="rounded-lg p-2 border"
            style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}
          >
            <p className="text-[11px] font-semibold mb-0.5" style={{ color: "#64748b" }}>
              {language === "mr" ? "शिकणे" : "Learning"}
            </p>
            <p className="text-xs font-medium" style={{ color: "#334155" }}>
              {getLearningText()}
            </p>
          </div>
        </div>

        <div
          className="rounded-xl p-2.5 mb-2.5 border"
          style={{ backgroundColor: "#eff6ff", borderColor: "#bfdbfe" }}
        >
          <p className="text-[11px] font-bold mb-0.5" style={{ color: "#1e3a8a" }}>Strength</p>
          <p className="text-xs font-semibold" style={{ color: "#1d4ed8" }}>
            {renderShort(c.strengths?.[language])}
          </p>
        </div>
      </div>

      <div className="mt-1">
        <div className="pt-2 border-t border-gray-100">
          <p className="text-[11px] font-medium" style={{ color: "#64748b" }}>Growth</p>
          <p className="text-xs" style={{ color: "#334155" }}>
            {renderShort(c.growth_suggestions?.[language])}
          </p>
        </div>

        <div className="pt-1.5 border-t border-gray-100 mt-1.5">
          <p className="text-[11px] font-medium" style={{ color: "#64748b" }}>Reflection</p>
          <p className="text-xs italic" style={{ color: "#475569" }}>
            {c.reflection_prompts?.[language]?.[0]}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MAIN COMPONENT (2 CLEAN PAGES) ---------------- */

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
        name: TRAIT_DISPLAY[code]?.[language],
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
        title: TRAIT_DISPLAY[code]?.[language],
        label: cat?.archetype?.[language] || cat?.archetype?.en,
        content: cat?.content,
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
              {language === "mr"
                ? "तुमचे व्यक्तिमत्त्व विश्लेषण"
                : "Your Personality Snapshot"}
            </h1>
          </div>

          <p className="text-base text-gray-500 mt-1">
            {language === "mr"
              ? "तुम्ही कसे विचार करता आणि कसे शिकता हे समजून घ्या"
              : "Understanding how you think and learn"}
          </p>

          <div className="mt-3 mb-3">
            <hr style={{ border: "none", height: 1, backgroundColor: "#e2e8f0" }} />
          </div>

          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            {language === "mr"
              ? "तुमचे विचार, भावना आणि शिकण्याची पद्धत समजून घेण्यासाठी तुमच्या व्यक्तिमत्त्व गुणांचा अभ्यास करूया."
              : "Let's explore your personality traits to see what makes you unique and how you like to think and learn."}
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
            {language === "mr"
              ? "तुमचे व्यक्तिमत्त्व तपशील"
              : "Your Personality Insights"}
          </h3>
          <p className="text-xs text-gray-500">
            {language === "mr"
              ? "तुमच्या गुणधर्मांचे सविस्तर विश्लेषण"
              : "A deeper understanding of your personality traits"}
          </p>
        </div>

        {/* TRAITS ROW (2 CARDS) */}
        <div className="grid grid-cols-2 gap-4">
          {page1Traits.map((t) => (
            <TraitCard key={t.code} trait={t} language={language} />
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
              {language === "mr" ? "व्यक्तिमत्त्व तपशील (भाग २)" : "Personality Dimensions (Part 2)"}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {language === "mr" ? "सविस्तर विश्लेषण" : "Detailed Insights"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {page2Traits.map((t) => (
            <TraitCard key={t.code} trait={t} language={language} />
          ))}

          {/* 4th Card (Motivation Card) */}
          <div
            className="rounded-2xl p-6 flex flex-col items-center justify-center text-center border"
            style={{
              backgroundColor: "#eff6ff",
              borderColor: "#bfdbfe",
              pageBreakInside: "avoid",
              minHeight: "220px",
            }}
          >
            <i className="bi bi-stars text-3xl mb-3" style={{ color: "#2563eb" }} />
            <p className="text-2xl font-extrabold leading-relaxed">
              <span style={{ color: "#1e3a8a" }}>
                {language === "mr"
                  ? "तुमच्यातील प्रत्येक गुण"
                  : "Every trait you have"}
              </span>
              <br />
              <span style={{ color: "#2563eb" }}>
                {language === "mr"
                  ? "तुमची ताकद आहे"
                  : "is your strength"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}