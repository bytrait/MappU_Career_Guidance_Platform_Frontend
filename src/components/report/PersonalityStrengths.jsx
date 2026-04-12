// src/components/PersonalityStrengths.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";
import traitsData from "../../data/personality_traits_v2.json";

import PersonalityImg from "../../assets/personality.png";

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

// category logic
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

// text renderer (no bullets)
function renderTextList(list) {
  if (!list) return null;
  return list.join(". ") + ".";
}

// Trait Card
function TraitCard({ trait, language }) {
  const c = trait.content;
  if (!c) return null;

  const renderShort = (list) => list?.slice(0, 2).join(", ");

  return (
    <div className="bg-white rounded-2xl p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-primary font-semibold text-xl flex items-center">
          <i className="bi bi-person-lines-fill mr-2"></i>
          {trait.label}
        </h3>

        <div className="text-xs bg-blue-50 text-primary px-3 py-1 rounded-full font-medium">
          {trait.title}
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
          <p className="text-default font-medium text-sm leading-snug">
            {renderShort(c.how_it_shows?.[language])}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-gray-500 text-sm mb-1 flex items-center">
            <i className="bi bi-book mr-1"></i>
            {language === "mr" ? "शिकणे" : "Learning"}
          </p>
          <p className="text-gray-700 font-medium text-sm leading-snug">
            {renderShort(c.learning_preference?.[language])}
          </p>
        </div>

      </div>

      {/* STRENGTH */}
      <div className="bg-accent-light border border-primary-light rounded-xl p-4 mb-6">
        <p className="text-sm font-semibold text-primary mb-1 flex items-center font-sm">
          <i className="bi bi-stars mr-1"></i>
          {language === "mr" ? "तुमची ताकद" : "Your Strength"}
        </p>
        <p className="text-default text-sm font-semibold leading-snug">
          {renderShort(c.strengths?.[language])}
        </p>
      </div>

      {/* GROWTH */}
      <div className="pt-3 border-t border-gray-100">
        <p className="text-sm text-gray-500 mb-1 flex items-center">
          <i className="bi bi-graph-up mr-1"></i>
          {language === "mr" ? "सुधारणा" : "Growth"}
        </p>

        <p className="text-sm text-gray-700 leading-relaxed">
          {renderShort(c.growth_suggestions?.[language])}
        </p>
      </div>

      {/* REFLECTION */}
      <div className="pt-3 border-t border-gray-100 mt-4">
        <p className="text-sm text-gray-500 mb-1 flex items-center">
          <i className="bi bi-question-circle mr-1"></i>
          {language === "mr" ? "विचार करा" : "Reflection"}
        </p>

        <p className="text-sm text-gray-700 leading-relaxed">
          {c.reflection_prompts?.[language]?.[0]}
        </p>
      </div>

    </div>
  );
}

export default function PersonalityStrengths({ scores = [], language = "en" }) {
  const [chartData, setChartData] = useState([]);
  const [traits, setTraits] = useState([]);

  useEffect(() => {
    if (!scores.length) return;

    const oceanScores = scores.filter((i) => i.assessmentType === "OCEAN");
    const ordered = ["O", "C", "E", "A", "N"];

    // chart (UNCHANGED)
    const chart = ordered.map((code) => {
      const item = oceanScores.find((s) => s.traitOrCategoryCode === code);
      return {
        name: TRAIT_DISPLAY[code]?.[language],
        value: item?.score || 0,
      };
    });

    setChartData(chart);

    // traits
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
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="max-w-7xl w-full px-0 sm:px-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-primary">
              {language === "mr"
                ? "तुमचे प्रमुख व्यक्तिमत्त्वाचे गुण"
                : "Your Top Personality Strengths"}
            </h2>
            <p className="text-muted mt-3">
              {language === "mr"
                ? "खालील विभाग तुमच्या प्रतिसादांवर आधारित व्यक्तिमत्त्वाचे गुण दाखवतो."
                : "The following section shows your personality traits based on your responses."}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-2 items-center">

          {/* Image */}
          <div className="w-full flex justify-center">
            <img
              src={PersonalityImg}
              alt="growth"
              className="w-full max-w-[500px] h-[420px] object-contain"
            />
          </div>

          {/* Chart (UNCHANGED DESIGN, just height aligned) */}
          <div className="w-full h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 0, right: 40, left: -25, bottom: 10 }}
              >
                <CartesianGrid stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  interval={0}
                  height={60}
                  tick={{
                    fontSize: 12,
                    fill: "#4b5563",
                  }}
                />
                <YAxis />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]}>
                  <LabelList dataKey="value" position="middle" fill="white" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
        <div className="max-w-7xl w-full mt-10 mb-4 px-2">
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
        {/* Traits */}
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

              <span className="bg-accent text-transparent bg-clip-text">
                {language === "mr"
                  ? "तुमची ताकद आहे"
                  : "is your strength"}
              </span>

            </p>
          </div>
        </div>
      </div>
    </div>
  );
}