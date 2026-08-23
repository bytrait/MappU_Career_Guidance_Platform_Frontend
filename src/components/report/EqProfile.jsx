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
} from "recharts";
import {
  EQ_DIMENSIONS,
  getEqContent,
} from "../../data/eqProfileContent";

function EqCard({ dim, score, language }) {
  const content = getEqContent(dim.code, score);
  const label = dim.label[language] || dim.label.en;

  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-primary font-semibold text-xl flex items-center">
          <i className="bi bi-heart-pulse mr-2"></i>
          {label}
        </h3>
        <div className="text-xs bg-blue-50 text-primary px-3 py-1 rounded-full font-medium">
          {content.level} · {score}/100
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
        <p className="text-gray-800 text-base leading-relaxed font-medium">
          {content.suggest}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-gray-500 text-sm mb-1">How this may show up</p>
          <p className="text-default font-medium text-sm leading-snug">
            {content.showUp}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
          <p className="text-gray-500 text-sm mb-1">How to leverage it</p>
          <p className="text-default font-medium text-sm leading-snug">
            {content.leverage}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        <span className="font-medium text-gray-600">Watch out for: </span>
        {content.watch}
      </p>
    </div>
  );
}

export default function EqProfile({ scores = [], language = "en" }) {
  const eqScores = useMemo(() => {
    const map = {};
    scores
      .filter((s) => s.assessmentType === "EQ")
      .forEach((s) => {
        map[s.traitOrCategoryCode] = Number(s.score) || 0;
      });
    return map;
  }, [scores]);

  const chartData = EQ_DIMENSIONS.map((d) => ({
    name: d.label[language] || d.label.en,
    score: eqScores[d.code] ?? 0,
  }));

  const hasData = Object.keys(eqScores).length > 0;
  if (!hasData) return null;

  const overall = Math.round(
    EQ_DIMENSIONS.reduce((sum, d) => sum + (eqScores[d.code] || 0), 0) /
      EQ_DIMENSIONS.length
  );

  return (
    <section className="mb-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">
            {language === "mr"
              ? "भावनिक बुद्धिमत्ता प्रोफाइल"
              : "Emotional Intelligence Profile"}
          </h2>
          <p className="text-gray-600 max-w-3xl">
            {language === "mr"
              ? "हे चार कौशल्य क्षेत्रे दर्शवते — निदान किंवा करिअर यशाचा अंदाज नाही."
              : "Four capability areas based on your responses — not a clinical diagnosis or a career prediction."}
          </p>
        </div>
        <div className="text-sm bg-blue-50 text-primary px-4 py-2 rounded-full font-semibold self-start">
          {language === "mr" ? "एकूण" : "Overall"}: {overall}/100
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-8 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={60} />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="score" fill="#2563eb" radius={[6, 6, 0, 0]}>
              <LabelList dataKey="score" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {EQ_DIMENSIONS.map((dim) => (
          <EqCard
            key={dim.code}
            dim={dim}
            score={eqScores[dim.code] ?? 0}
            language={language}
          />
        ))}
      </div>
    </section>
  );
}
