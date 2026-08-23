import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
} from "recharts";
import {
  LEARNING_DIMENSIONS,
  getLearningContent,
} from "../../data/learningProfileContent";

function LearningCard({ dim, score, language }) {
  const content = getLearningContent(dim.code, score, language);
  const label = dim.label[language] || dim.label.en;

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5 gap-3">
        <h3 className="text-primary font-semibold text-xl flex items-center">
          <i className="bi bi-lightbulb mr-2"></i>
          {label}
        </h3>
        <div className="text-xs bg-blue-50 text-primary px-3 py-1 rounded-full font-medium whitespace-nowrap">
          {content.badge}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{dim.opposite[language] || dim.opposite.en}</span>
          <span>{dim.positive[language] || dim.positive.en}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full relative">
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full border-2 border-white shadow"
            style={{ left: `calc(${Math.min(100, Math.max(0, score))}% - 6px)` }}
          />
        </div>
        <p className="text-right text-xs text-gray-400 mt-1">{score}/100</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
        <p className="text-gray-800 text-base leading-relaxed font-medium">
          {content.suggest}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 mb-3">
        <p className="text-gray-500 text-sm mb-1">How you may learn best</p>
        <p className="text-default font-medium text-sm leading-snug">
          {content.best}
        </p>
      </div>

      <p className="text-sm text-gray-500">
        <span className="font-medium text-gray-600">Watch out for: </span>
        {content.watch}
      </p>
    </div>
  );
}

export default function LearningPreferences({ scores = [], language = "en" }) {
  const learningScores = useMemo(() => {
    const map = {};
    scores
      .filter((s) => s.assessmentType === "LEARNING")
      .forEach((s) => {
        map[s.traitOrCategoryCode] = Number(s.score) || 0;
      });
    return map;
  }, [scores]);

  const chartData = LEARNING_DIMENSIONS.map((d) => ({
    name: (d.label[language] || d.label.en).split(" ↔ ")[0],
    score: learningScores[d.code] ?? 0,
  }));

  const hasData = Object.keys(learningScores).length > 0;
  if (!hasData) return null;

  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">
          {language === "mr" ? "शिक्षण प्राधान्ये" : "Learning Preferences"}
        </h2>
        <p className="text-gray-600 max-w-3xl">
          {language === "mr"
            ? "हे प्राधान्ये आहेत — निश्चित शिकण्याच्या शैली किंवा क्षमता नाहीत."
            : "These are preferences based on your responses — not fixed learning styles or measures of ability."}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-8 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <ReferenceLine y={50} stroke="#94a3b8" strokeDasharray="4 4" />
            <Bar dataKey="score" fill="#0d9488" radius={[6, 6, 0, 0]}>
              <LabelList dataKey="score" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {LEARNING_DIMENSIONS.map((dim) => (
          <LearningCard
            key={dim.code}
            dim={dim}
            score={learningScores[dim.code] ?? 0}
            language={language}
          />
        ))}
      </div>
    </section>
  );
}
