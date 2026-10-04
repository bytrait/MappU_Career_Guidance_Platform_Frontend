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
    return {
      text: language === "mr" ? "सराव" : "Needs-Focus",
      style: { backgroundColor: "#fef2f2", color: "#b91c1c", borderColor: "#fecaca" },
    };

  if (diff >= 10)
    return {
      text: language === "mr" ? "चांगले" : "Good",
      style: { backgroundColor: "#fefce8", color: "#a16207", borderColor: "#fef08a" },
    };

  return {
    text: language === "mr" ? "मजबूत" : "Strong",
    style: { backgroundColor: "#ecfdf5", color: "#047857", borderColor: "#a7f3d0" },
  };
}

/* ------------------ DOT VISUAL ------------------ */

function SkillDots({ userScore = 0, idealScore = 0, max = 10 }) {
  const user = Math.min(userScore, max);
  const ideal = Math.min(idealScore, max);

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => {
        if (i < user)
          return <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#2563eb" }} />;
        if (i < ideal)
          return <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#10b981" }} />;
        return <span key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#e2e8f0" }} />;
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

export default function PrintableCareerOptions({
  scores = [],
  careers = [],
  language = "en",
}) {
  /* -------- USER APTITUDE -------- */
  const userAptitude = scores
    .filter((s) => s.assessmentType === "APTITUDE")
    .reduce((a, s) => ({ ...a, [s.traitOrCategoryCode]: s.score }), {});

  function cosineSimilarity(user, ideal) {
    let dot = 0;
    let userMag = 0;
    let idealMag = 0;

    for (const key of ["R", "I", "A", "S", "E", "C"]) {
      const u = Number(user[key]) || 0;
      const i = Number(ideal[key]) || 0;

      dot += u * i;
      userMag += u * u;
      idealMag += i * i;
    }

    if (userMag === 0 || idealMag === 0) {
      return 0;
    }

    return dot / (Math.sqrt(userMag) * Math.sqrt(idealMag));
  }

  /* -------- MATCH CHART DATA (same logic as CareerOptions.jsx) -------- */
  const chartData = useMemo(() => {
    if (!scores?.length || !careers?.length || !careerFields?.length) {
      return [];
    }

    const userScoresObj = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0,
    };

    scores
      .filter((s) => s.assessmentType === "RIASEC")
      .forEach((s) => {
        if (userScoresObj.hasOwnProperty(s.traitOrCategoryCode)) {
          userScoresObj[s.traitOrCategoryCode] = Number(s.score) || 0;
        }
      });

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

        if (!field || !field.scores) {
          return null;
        }

        const similarity = cosineSimilarity(
          userScoresObj,
          field.scores
        );

        return {
          category_id: id,
          name:
            language === "mr"
              ? field.careerField?.mr
              : field.careerField?.en,
          value: Math.round(similarity * 100),
          icon: field.icon,
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.value - a.value);
  }, [scores, careers, language]);

  /* -------- CAREER CARD -------- */
  const CareerCard = ({ career }) => {
    const idealAptitude = career.aptitude || {};

    return (
      <div
        className="rounded-2xl bg-white border p-5 shadow-sm"
        style={{
          borderColor: "#dbeafe",
          pageBreakInside: "avoid",
        }}
      >
        {/* Header */}
        <div className="flex items-start gap-2.5 mb-1">
          <i className="bi bi-briefcase-fill text-lg" style={{ color: "#2563eb" }} />
          <h4 className="text-base font-bold" style={{ color: "#1e3a8a" }}>
            {career.title?.value || career.title}
          </h4>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed mb-3">
          {career.description?.value || career.description}
        </p>

        <div className="grid grid-cols-12 gap-2 items-center">
          <div className="col-span-5 flex items-center justify-center">
            <div className="p-2 flex flex-col items-center justify-center h-full">
              <div className="relative flex items-center justify-center">
                <CareerFitRing value={career.similarity} />
                <div className="absolute text-center">
                  <div className="text-base font-bold" style={{ color: "#1e3a8a" }}>
                    {career.similarity}%
                  </div>
                </div>
              </div>
              <div className="text-xs font-semibold mt-1" style={{ color: "#2563eb" }}>
                {language === "mr" ? "करिअर जुळवणी" : "Career Fit"}
              </div>
            </div>
          </div>

          <div className="col-span-7">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="text-xs font-bold" style={{ color: "#1e293b" }}>
                {language === "mr"
                  ? "क्षमता संरेखन"
                  : "Ability Alignment"}
              </div>

              <div className="flex items-center gap-2 text-[11px] text-gray-500">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#2563eb" }} />
                  {language === "mr" ? "तुमची क्षमता" : "Your Ability"}
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#10b981" }} />
                  {language === "mr" ? "आवश्यक" : "Required"}
                </div>
              </div>
            </div>

            <div className="space-y-2">
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
                    className="grid grid-cols-[130px_1fr_85px] items-center gap-1"
                  >
                    <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
                      <i className={`bi ${APTITUDE_ICONS[code]}`} style={{ color: "#2563eb" }} />
                      {APTITUDE_LABELS[code]?.[language]}
                    </div>

                    <div className="flex justify-center">
                      <SkillDots userScore={userScore} idealScore={idealScore} />
                    </div>

                    <span
                      className="px-2 py-0.5 text-[10px] rounded-full border text-center font-semibold"
                      style={tag.style}
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
      {/* ================= MATCH CHART PAGE (Page 9) ================= */}
      {chartData.length > 0 && (
        <PrintableCareerMatchChart
          chartData={chartData}
          language={language}
        />
      )}

      {/* ================= CAREER PAGES (Pages 10 to 14, 2 per page) ================= */}
      {pages.map((pageCareers, pageIndex) => (
        <div
          key={pageIndex}
          className="print-page font-sans text-gray-900"
          style={{
            width: "210mm",
            height: "297mm",
            maxHeight: "297mm",
            boxSizing: "border-box",
            padding: "10mm 14mm",
            background: "#ffffff",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            pageBreakAfter: "always",
            breakAfter: "page",
          }}
        >
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
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold" style={{ color: "#1e3a8a" }}>
                  {language === "mr"
                    ? "शिफारस केलेली करिअर"
                    : "Recommended Careers"}
                </h2>
                <p className="text-xs text-gray-500 max-w-xl mx-auto mt-1">
                  {language === "mr"
                    ? "तुमच्या व्यक्तिमत्व, आवडी आणि क्षमतांवर आधारित करिअर पर्याय."
                    : "These career options are recommended based on your personality, interests, and aptitude strengths."}
                </p>
              </div>
            )}

            {/* ---------- CAREER CARDS (2 PER PAGE) ---------- */}
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
