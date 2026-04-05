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

/* ---------------- TRAIT CARD (UNCHANGED DESIGN) ---------------- */

function TraitCard({ trait, language }) {
  const c = trait.content;
  if (!c) return null;

  const renderShort = (list) => list?.slice(0, 2).join(", ");

  return (
    <div
      className="bg-white  border border-gray-50 rounded-2xl p-4"
      style={{ pageBreakInside: "avoid" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-primary font-semibold text-lg flex items-center">
          <i className="bi bi-person-lines-fill mr-2"></i>
          {trait.label}
        </h3>

        <div className="text-[10px] bg-surface text-primary px-2 py-1 rounded-full font-medium">
          {trait.title}
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
        <p className="text-gray-800 text-sm leading-relaxed font-medium">
          {c.meaning?.[language]}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
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

      <div className="bg-accent-light border border-primary-light rounded-xl p-3 mb-4">
        <p className="text-xs text-primary font-semibold mb-1">Strength</p>
        <p className="text-default text-xs font-semibold">
          {renderShort(c.strengths?.[language])}
        </p>
      </div>

      <div className="pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-1">Growth</p>
        <p className="text-xs text-gray-700">
          {renderShort(c.growth_suggestions?.[language])}
        </p>
      </div>

      <div className="pt-2 border-t border-gray-100 mt-2">
        <p className="text-xs text-gray-500 mb-1">Reflection</p>
        <p className="text-xs text-gray-700">
          {c.reflection_prompts?.[language]?.[0]}
        </p>
      </div>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

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

  return (
    <div
      style={{
        width: "210mm",
        padding: "10mm",
        background: "#fff",
      }}
    >
      {/* HEADER (unchanged, just tighter spacing) */}
      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-3">
          <i className="bi bi-lightbulb text-yellow-400 text-4xl" />
          <h1 className="text-4xl font-bold text-primary">
            {language === "mr"
              ? "तुमचे व्यक्तिमत्त्व विश्लेषण"
              : "Your Personality Snapshot"}
          </h1>
        </div>

        <p className="text-xl text-muted mt-1">
          {language === "mr"
            ? "तुम्ही कसे विचार करता आणि कसे शिकता हे समजून घ्या"
            : "Understanding how you think and learn"}
        </p>

        <div className="mt-6 mb-6">
          <hr style={{ border: "none", height: 1, backgroundColor: "#eee" }} />
        </div>

        <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
          {language === "mr"
            ? "तुमचे विचार, भावना आणि शिकण्याची पद्धत समजून घेण्यासाठी तुमच्या व्यक्तिमत्त्व गुणांचा अभ्यास करूया."
            : "Let's explore your personality traits to see what makes you unique and how you like to think and learn."}
        </p>
      </div>
      {/* MAIN GRID - FORCE 2 COLUMN */}
      <div className="grid grid-cols-12 gap-4 mt-6">

        {/* IMAGE (smaller column) */}
        <div className="col-span-4 flex justify-center items-center">
          <img
            src={PersonalityImg}
            alt="growth"
            className="w-[260px] h-[220px] object-contain"
          />
        </div>

        {/* CHART (bigger column) */}
        <div className="col-span-8 flex justify-center">
          <BarChart
            width={420}   // 👈 increased
            height={260}  // 👈 increased
            data={chartData}
            margin={{ top: 0, right: 20, left: -20, bottom: 10 }}
          >
            <CartesianGrid stroke="#e5e7eb" />
              <XAxis dataKey="name" interval={0} angle={-20} textAnchor="end" height={70} />
              <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" isAnimationActive={false}>
              <LabelList dataKey="value" position="middle" fill="white"/>
            </Bar>
          </BarChart>
        </div>

      </div>
      <div className="w-full mt-10 mb-4">
        <h3 className="text-2xl font-semibold text-primary">
          {language === "mr"
            ? "तुमचे व्यक्तिमत्त्व तपशील"
            : "Your Personality Insights"}
        </h3>

        <p className="text-muted mt-1 text-sm">
          {language === "mr"
            ? "तुमच्या गुणधर्मांचे सविस्तर विश्लेषण"
            : "A deeper understanding of your personality traits"}
        </p>
      </div>
      {/* TRAITS - FORCE 2 COLUMN */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {traits.map((t) => (
          <TraitCard key={t.code} trait={t} language={language} />
        ))}

        {/* 6th Card (Motivation) */}
        <div className="bg-white border border-gray-50 rounded-2xl p-6 flex items-center justify-center text-center h-full">
          <p className="text-xl sm:text-5xl font-bold leading-relaxed">

            <span className="text-primary">
              {language === "mr"
                ? "तुमच्यातील प्रत्येक गुण"
                : "Every trait you have"}
            </span>

            <br />

            <span className="text-accent bg-clip-text">
              {language === "mr"
                ? "तुमची ताकद आहे"
                : "is your strength"}
            </span>

          </p>
        </div>
      </div>

    </div>
  );
}