import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  CartesianGrid,
} from "recharts";
import {
  EQ_DIMENSIONS,
  getEqContent,
} from "../../data/eqProfileContent";

const EQ_ICONS = {
  SAW: "bi-eye-fill",
  SR: "bi-sliders",
  EM: "bi-heart-fill",
  SS: "bi-people-fill",
};

function EqCard({ dim, score, language }) {
  const c = getEqContent(dim.code, score);
  if (!c) return null;

  const icon = EQ_ICONS[dim.code] || "bi-heart-pulse-fill";
  const nameText = dim.name || "";

  return (
    <div
      className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between"
      style={{ pageBreakInside: "avoid", boxSizing: "border-box" }}
    >
      <div>
        {/* 1. Header: Icon + Title + Level Badge */}
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-semibold text-[15px] flex items-center" style={{ color: "#1e3a8a" }}>
            <i className={`bi ${icon} mr-2`} style={{ color: "#2563eb" }} />
            {nameText}
          </h3>

          <div
            className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold border"
            style={{ backgroundColor: "#eff6ff", color: "#1d4ed8", borderColor: "#bfdbfe" }}
          >
            {c.level}
          </div>
        </div>

        {/* 2. Meaning Box */}
        <div
          className="rounded-xl p-2.5 mb-2.5 border"
          style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}
        >
          <p className="text-xs leading-relaxed font-medium" style={{ color: "#1e293b" }}>
            {c.suggest}
          </p>
        </div>

        {/* 3. Two-Column Grid: Behavior & Application */}
        <div className="grid grid-cols-2 gap-2 mb-2.5">
          <div
            className="rounded-lg p-2 border"
            style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}
          >
            <p className="text-[11px] font-semibold mb-0.5" style={{ color: "#64748b" }}>
              {language === "mr" ? "वर्तन" : "Behavior"}
            </p>
            <p className="text-xs font-medium line-clamp-2" style={{ color: "#334155" }}>
              {c.showUp}
            </p>
          </div>

          <div
            className="rounded-lg p-2 border"
            style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}
          >
            <p className="text-[11px] font-semibold mb-0.5" style={{ color: "#64748b" }}>
              {language === "mr" ? "उपयोग" : "Application"}
            </p>
            <p className="text-xs font-medium line-clamp-2" style={{ color: "#334155" }}>
              {c.leverage}
            </p>
          </div>
        </div>

        {/* 4. Strength Callout */}
        <div
          className="rounded-xl p-2.5 mb-2.5 border"
          style={{ backgroundColor: "#eff6ff", borderColor: "#bfdbfe" }}
        >
          <p className="text-[11px] font-bold mb-0.5" style={{ color: "#1e3a8a" }}>Strength</p>
          <p className="text-xs font-semibold" style={{ color: "#1d4ed8" }}>
            {c.strength}
          </p>
        </div>
      </div>

      <div className="mt-1">
        {/* 5. Growth Footer */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-[11px] font-medium" style={{ color: "#64748b" }}>Growth</p>
          <p className="text-xs" style={{ color: "#334155" }}>
            {c.watch}
          </p>
        </div>

        {/* 6. Reflection Footer */}
        <div className="pt-1.5 border-t border-gray-100 mt-1.5">
          <p className="text-[11px] font-medium" style={{ color: "#64748b" }}>Reflection</p>
          <p className="text-xs italic" style={{ color: "#475569" }}>
            {c.reflection}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PrintableEqProfile({ scores = [], language = "en" }) {
  const eqScores = useMemo(() => {
    const map = {};
    scores
      .filter((s) => s.assessmentType === "EQ" || s.assessmentType === "EMOTIONAL_INTELLIGENCE")
      .forEach((s) => {
        map[s.traitOrCategoryCode] = Number(s.score) || 0;
      });
    return map;
  }, [scores]);

  const hasData = Object.keys(eqScores).length > 0;
  if (!hasData) return null;

  const chartData = EQ_DIMENSIONS.map((d) => ({
    name: d.name,
    score: eqScores[d.code] ?? 0,
  }));

  const page1Dimensions = EQ_DIMENSIONS.slice(0, 2);
  const page2Dimensions = EQ_DIMENSIONS.slice(2, 4);

  return (
    <>
      {/* ---------------- PAGE 1 OF EQ PROFILE ---------------- */}
      <div
        className="print-page font-sans text-gray-900"
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
        <div className="text-center mb-3">
          <div className="flex justify-center items-center gap-3">
            <i className="bi bi-heart-pulse-fill text-3xl" style={{ color: "#2563eb" }} />
            <h1 className="text-3xl font-bold" style={{ color: "#1e3a8a" }}>
              {language === "mr"
                ? "भावनिक बुद्धिमत्ता प्रोफाइल"
                : "Emotional Intelligence Profile"}
            </h1>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {language === "mr"
              ? "चार महत्त्वाची भावनिक कौशल्य क्षेत्रे आणि क्षमता"
              : "Four core emotional capability areas based on your responses"}
          </p>

          <div className="mt-2 mb-2">
            <hr style={{ border: "none", height: 1, backgroundColor: "#e2e8f0" }} />
          </div>

          <p className="text-xs text-gray-600 max-w-2xl mx-auto">
            {language === "mr"
              ? "हा विभाग तुमच्या भावना समजून घेण्याची आणि निर्णय घेण्याची क्षमता दाखवतो."
              : "This section highlights your emotional strengths, interpersonal understanding, and self-management capabilities."}
          </p>
        </div>

        {/* AREA / WAVE SPECTRUM CHART */}
        <div className="flex justify-center mb-3">
          <AreaChart
            width={580}
            height={190}
            data={chartData}
            margin={{ top: 20, right: 35, left: 0, bottom: 15 }}
          >
            <defs>
              <linearGradient id="eqAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#1e3a8a", fontWeight: 600 }}
              interval={0}
            />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#2563eb"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#eqAreaGrad)"
              isAnimationActive={false}
              dot={{ stroke: "#2563eb", strokeWidth: 2, r: 4, fill: "#ffffff" }}
            >
              <LabelList
                dataKey="score"
                position="top"
                fill="#1e3a8a"
                fontSize={11}
                fontWeight={700}
                formatter={(val) => `${val}/100`}
              />
            </Area>
          </AreaChart>
        </div>

        {/* SUBTITLE */}
        <div className="w-full mb-3">
          <h3 className="text-xl font-bold" style={{ color: "#1e3a8a" }}>
            {language === "mr" ? "भावनिक क्षमता विश्लेषण" : "Emotional Capability Insights"}
          </h3>
          <p className="text-xs text-gray-500">
            {language === "mr"
              ? "तुमच्या भावनिक जाणिवा आणि निर्णय प्रक्रियेचे विश्लेषण"
              : "Detailed breakdown of self-awareness and self-management"}
          </p>
        </div>

        {/* 2 DIMENSIONS ROW */}
        <div className="grid grid-cols-2 gap-4">
          {page1Dimensions.map((dim) => (
            <EqCard
              key={dim.code}
              dim={dim}
              score={eqScores[dim.code] || 0}
              language={language}
            />
          ))}
        </div>
      </div>

      {/* ---------------- PAGE 2 OF EQ PROFILE ---------------- */}
      <div
        className="print-page font-sans text-gray-900"
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
              {language === "mr" ? "भावनिक क्षमता विश्लेषण (भाग २)" : "Emotional Capability Insights (Part 2)"}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {language === "mr" ? "सविस्तर विश्लेषण" : "Detailed Insights"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Top 2 Dimension Cards */}
          {page2Dimensions.map((dim) => (
            <EqCard
              key={dim.code}
              dim={dim}
              score={eqScores[dim.code] || 0}
              language={language}
            />
          ))}

          {/* 3rd Card: Emotional Mastery Framework Card */}
          <div
            className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between"
            style={{ pageBreakInside: "avoid", boxSizing: "border-box" }}
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="font-semibold text-[15px] flex items-center" style={{ color: "#1e3a8a" }}>
                  <i className="bi bi-shield-check mr-2" style={{ color: "#2563eb" }} />
                  {language === "mr" ? "भावनिक प्रभुत्व कृती योजना" : "Emotional Mastery Framework"}
                </h3>
                <div
                  className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold border"
                  style={{ backgroundColor: "#eff6ff", color: "#1d4ed8", borderColor: "#bfdbfe" }}
                >
                  {language === "mr" ? "मार्गदर्शक" : "Core Pillar"}
                </div>
              </div>

              <div
                className="rounded-xl p-2.5 mb-2.5 border"
                style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}
              >
                <p className="text-xs leading-relaxed font-medium" style={{ color: "#1e293b" }}>
                  {language === "mr"
                    ? "भावनिक बुद्धिमत्ता विकसित करणे ही एक निरंतर प्रक्रिया आहे जी निर्णयक्षमता, नेतृत्व आणि सहकार्य सुधारते."
                    : "Developing emotional intelligence is an ongoing practice that enhances decision-making, interpersonal communication, and leadership agility."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2.5">
                <div
                  className="rounded-lg p-2 border"
                  style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}
                >
                  <p className="text-[11px] font-semibold mb-0.5" style={{ color: "#64748b" }}>
                    {language === "mr" ? "आत्म-संयम" : "Self-Mastery"}
                  </p>
                  <p className="text-xs font-medium line-clamp-2" style={{ color: "#334155" }}>
                    {language === "mr" ? "प्रतिक्रिया देण्यापूर्वी विचार करा" : "Pause, reflect and respond with clear intent"}
                  </p>
                </div>

                <div
                  className="rounded-lg p-2 border"
                  style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}
                >
                  <p className="text-[11px] font-semibold mb-0.5" style={{ color: "#64748b" }}>
                    {language === "mr" ? "संवेदनशीलता" : "Empathy"}
                  </p>
                  <p className="text-xs font-medium line-clamp-2" style={{ color: "#334155" }}>
                    {language === "mr" ? "इतरांचे दृष्टिकोन समजून घ्या" : "Listen actively and value diverse viewpoints"}
                  </p>
                </div>
              </div>

              <div
                className="rounded-xl p-2.5 mb-2.5 border"
                style={{ backgroundColor: "#eff6ff", borderColor: "#bfdbfe" }}
              >
                <p className="text-[11px] font-bold mb-0.5" style={{ color: "#1e3a8a" }}>Strength</p>
                <p className="text-xs font-semibold" style={{ color: "#1d4ed8" }}>
                  {language === "mr" ? "संयम आणि सहकार्याची क्षमता" : "Cultivating emotional balance in high-stakes situations"}
                </p>
              </div>
            </div>

            <div className="mt-1">
              <div className="pt-2 border-t border-gray-100">
                <p className="text-[11px] font-medium" style={{ color: "#64748b" }}>Growth</p>
                <p className="text-xs" style={{ color: "#334155" }}>
                  {language === "mr" ? "दररोज 2 मिनिटे चिंतन सराव करा" : "Adopt daily micro-reflections after key meetings"}
                </p>
              </div>

              <div className="pt-1.5 border-t border-gray-100 mt-1.5">
                <p className="text-[11px] font-medium" style={{ color: "#64748b" }}>Reflection</p>
                <p className="text-xs italic" style={{ color: "#475569" }}>
                  {language === "mr" ? "तुमची भावनिक ताकद तुम्हाला ध्येय गाठण्यात कशी मदत करेल?" : "How will your emotional awareness accelerate your long-term career goals?"}
                </p>
              </div>
            </div>
          </div>

          {/* 4th Card: Motivation Card */}
          <div
            className="rounded-2xl p-6 flex flex-col items-center justify-center text-center border"
            style={{
              backgroundColor: "#eff6ff",
              borderColor: "#bfdbfe",
              pageBreakInside: "avoid",
              minHeight: "220px",
            }}
          >
            <i className="bi bi-heart-pulse-fill text-3xl mb-3" style={{ color: "#2563eb" }} />
            <p className="text-2xl font-extrabold leading-relaxed">
              <span style={{ color: "#1e3a8a" }}>
                {language === "mr"
                  ? "भावनिक जाणीव हीच खरी ताकद"
                  : "Emotional awareness"}
              </span>
              <br />
              <span style={{ color: "#2563eb" }}>
                {language === "mr"
                  ? "यशाचा मार्ग सुलभ करते"
                  : "is your superpower"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
