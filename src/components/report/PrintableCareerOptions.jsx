// src/components/printables/PrintableCareerOptions.jsx
import React, { useMemo } from "react";
import PrintableCareerMatchChart from "./PrintableCareerMatchChart";
import careerFields from "../../data/career_fields.json";

/* ------------------ APTITUDE META ------------------ */

const APTITUDE_LABELS = {
  NA: { en: "Numerical Ability", mr: "सांख्यिक क्षमता" },
  MR: { en: "Mechanical Reasoning", mr: "यांत्रिक तर्क" },
  LA: { en: "Language Ability", mr: "भाषिक क्षमता" },
  LR: { en: "Logical Reasoning", mr: "तार्किक तर्क" },
  SA: { en: "Spatial Ability", mr: "स्थानिक क्षमता" },
};

const APTITUDE_ICONS = {
  NA: "bi-calculator",
  MR: "bi-gear",
  LA: "bi-chat-dots",
  LR: "bi-lightbulb",
  SA: "bi-bounding-box",
};

/* ------------------ SKILL TAG ------------------ */

function getSkillTag(userPct, idealPct, language) {
  const diff = idealPct - userPct;

  if (diff >= 25)
    return language === "mr"
      ? { text: "सराव", cls: "bg-red-100 text-red-700 border-red-300" }
      : { text: "Needs-Focus", cls: "bg-red-100 text-red-700 border-red-300" };

  if (diff >= 10)
    return language === "mr"
      ? { text: "चांगले", cls: "bg-yellow-100 text-yellow-700 border-yellow-300" }
      : { text: "Good", cls: "bg-yellow-100 text-yellow-700 border-yellow-300" };

  return language === "mr"
    ? { text: "मजबूत", cls: "bg-green-100 text-green-700 border-green-300" }
    : { text: "Strong", cls: "bg-green-100 text-green-700 border-green-300" };
}

/* ------------------ DOT VISUAL ------------------ */

function SkillDots({ userScore = 0, idealScore = 0, max = 10 }) {
  const user = Math.min(userScore, max);
  const ideal = Math.min(idealScore, max);

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => {
        if (i < user)
          return <span key={i} className="w-2.5 h-2.5 rounded-full bg-blue-600" />;
        if (i < ideal)
          return <span key={i} className="w-2.5 h-2.5 rounded-full bg-green-400" />;
        return <span key={i} className="w-2.5 h-2.5 rounded-full bg-gray-200" />;
      })}
    </div>
  );
}

/* ------------------ RING CONFIG ------------------ */

const RING_RADIUS = 52;
const RING_STROKE = 8;
const RING_SIZE = RING_RADIUS * 2 + RING_STROKE * 2;
const CENTER = RING_SIZE / 2;

/* ------------------ RING COMPONENT ------------------ */

function CareerFitRing({ value }) {
  const normalized = RING_RADIUS - RING_STROKE / 2;
  const circumference = 2 * Math.PI * normalized;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg
      width={RING_SIZE}
      height={RING_SIZE}
      viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
      className="-rotate-90"
    >
      <circle
        cx={CENTER}
        cy={CENTER}
        r={normalized}
        stroke="#dbeafe"
        strokeWidth={RING_STROKE}
        fill="none"
      />
      <circle
        cx={CENTER}
        cy={CENTER}
        r={normalized}
        stroke="#2563eb"
        strokeWidth={RING_STROKE}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
}

/* ------------------ PAGINATION ------------------ */

function paginateCareersTwoPerPage(careers) {
  const pages = [];
  for (let i = 0; i < careers.length; i += 2) {
    pages.push(careers.slice(i, i + 2));
  }
  return pages;
}

/* ------------------ MAIN COMPONENT ------------------ */

export default function   PrintableCareerOptions({
  scores = [],
  careers = [],
  language = "en",
}) {
  /* -------- USER APTITUDE -------- */
  const userAptitude = scores
    .filter((s) => s.assessmentType === "APTITUDE")
    .reduce((a, s) => ({ ...a, [s.traitOrCategoryCode]: s.score }), {});

  /* -------- MATCH CHART DATA -------- */
  const chartData = useMemo(() => {
    const riasecScores = scores
      .filter((s) => s.assessmentType === "RIASEC")
      .reduce((acc, s) => {
        acc[s.traitOrCategoryCode] = s.score;
        return acc;
      }, {});

    const categoryIds = [
      ...new Set(
        careers
          .map((c) => c.category_id)
          .filter((id) => id !== null && id !== undefined)
      ),
    ];

    return categoryIds
      .map((id) => {
        const field = careerFields.find(
          (f) => f.category_id === id
        );

        if (!field || !field.scores) return null;

        let weighted = 0;

        ["R", "I", "A", "S", "E", "C"].forEach((key) => {
          if (riasecScores[key] != null && field.scores[key] != null) {
            weighted += (riasecScores[key] / 30) * field.scores[key];
          }
        });

        return {
          category_id: id, // ✅ IMPORTANT
          name:
            language === "mr"
              ? field.careerField?.mr
              : field.careerField?.en,
          value: Math.round(weighted * 100),
          icon: field.icon,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.value - a.value);
  }, [scores, careers, language]);

  /* -------- CAREER CARD (UNCHANGED) -------- */
  const CareerCard = ({ career }) => {
    const idealAptitude = career.aptitude || {};

    return (
      <div className="rounded-3xl bg-white border border-blue-100 p-6 print:break-inside-avoid">
        {/* Header */}
        <div className="flex items-start gap-3">
          <i className="bi bi-briefcase-fill text-primary text-lg" />
          <h4 className="text-lg font-semibold text-primary">
            {career.title?.value}
          </h4>
        </div>

        <p className="text-sm text-gray-600 mt-1">
          {career.description?.value}
        </p>

        <div className="grid grid-cols-12 gap-2 mt-4 items-center">
          <div className="col-span-5 flex items-center justify-center">
            <div className="p-4 flex flex-col items-center justify-center h-full">
              <div className="relative flex items-center justify-center">
                <CareerFitRing value={career.similarity} />
                <div className="absolute text-center">
                  <div className="text-lg font-bold text-primary">
                    {career.similarity}%
                  </div>
                </div>
              </div>
              <div className="text-xs font-semibold text-primary mb-2">
                {language === "mr" ? "करिअर जुळवणी" : "Career Fit"}
              </div>
            </div>
          </div>

          <div className="col-span-7">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-sm font-semibold text-gray-800 mb-3">
                {language === "mr"
                  ? "या करिअर साठी क्षमता संरेखन"
                  : "Ability Alignment for This Career"}
              </div>

              <div className="flex items-center gap-2 text-sm mb-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  {language === "mr" ? "तुमची क्षमता" : "Your Ability"}
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  {language === "mr" ? "आवश्यक क्षमता" : "Required Ability"}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {Object.entries(idealAptitude).map(([code, idealScore]) => {
                const userScore = userAptitude[code] ?? 0;
                const tag = getSkillTag(
                  (userScore / 10) * 100,
                  (idealScore / 10) * 100,
                  language
                );

                return (
                  <div
                    key={code}
                    className="grid grid-cols-[140px_1fr_90px] items-center gap-1"
                  >
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <i className={`bi ${APTITUDE_ICONS[code]} text-blue-500`} />
                      {APTITUDE_LABELS[code]?.[language]}
                    </div>

                    <div className="flex justify-center">
                      <SkillDots userScore={userScore} idealScore={idealScore} />
                    </div>

                    <span
                      className={`px-2 py-0.5 text-[10px] rounded-full border min-w-[88px] text-center ${tag.cls}`}
                    >
                      {tag.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const pages = useMemo(
    () => paginateCareersTwoPerPage(careers),
    [careers]
  );

  return (
    <>
      {/* ================= MATCH CHART PAGE ================= */}
      {chartData.length > 0 && (
        <div className="print-page">
          <PrintableCareerMatchChart
            chartData={chartData}
            language={language}
          />
        </div>
      )}

      {/* ================= CAREER PAGES ================= */}
      {pages.map((pageCareers, pageIndex) => (
        <div key={pageIndex} className="print-page">

          {/* ---------- PAGE CONTENT ---------- */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* ---------- PAGE HEADING (ONLY FIRST CAREER PAGE) ---------- */}
            {pageIndex === 0 && (
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-blue-800">
                  {language === "mr"
                    ? "शिफारस केलेली करिअर"
                    : "Recommended Careers"}
                </h2>
                <p className="text-sm text-gray-600 max-w-xl mx-auto mt-1">
                  {language === "mr"
                    ? "तुमच्या व्यक्तिमत्व, आवडी आणि क्षमतांवर आधारित करिअर पर्याय."
                    : "These career options are recommended based on your personality, interests, and aptitude strengths."}
                </p>
              </div>
            )}

            {/* ---------- CAREER CARDS ---------- */}
            <div className="space-y-4">
              {pageCareers.map((career) => (
                <CareerCard key={career.id} career={career} />
              ))}
            </div>
          </div>

          {/* ---------- FOOTER (PUSHED TO BOTTOM) ---------- */}
          <div
            style={{
              marginTop: "auto",
              textAlign: "center",
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#d1d5db",
                margin: "0 auto 6px",
              }}
            />
            {pageIndex + 5}
          </div>

        </div>
      ))}

    </>
  );
}
