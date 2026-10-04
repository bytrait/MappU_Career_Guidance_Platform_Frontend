// src/components/PrintDocument.jsx
import React, { useMemo } from "react";
import PrintablePersonalityStrengths from "./PrintablePersonalityStrengths";
import PrintableCareerInterests from "./PrintableCareerInterests";
import PrintableAptitudeStrengths from "./PrintableAptitudeStrengths";
import PrintableEqProfile from "./PrintableEqProfile";
import PrintableLearningPreferences from "./PrintableLearningPreferences";
import PrintableCareerOptions from "./PrintableCareerOptions";
import PrintableCareerDetail from "./PrintableCareerDetail";

import careerFields from "../../data/career_fields.json";

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

export default function PrintDocument({
  scores = [],
  language = "en",
  userDetails = {},
  recommendedCareers = [],
  selectedCareerIds = [],
  selectedCareersHtml = "",
}) {
  const orderedCareers = useMemo(() => {
    if (!recommendedCareers.length) return [];

    // -------- Build RIASEC Map --------
    const riasecScores = {
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
        if (riasecScores.hasOwnProperty(s.traitOrCategoryCode)) {
          riasecScores[s.traitOrCategoryCode] = Number(s.score) || 0;
        }
      });

    // -------- Build Chart Data --------
    const categoryIds = [
      ...new Set(
        recommendedCareers
          .map((c) => c.category_id)
          .filter((id) => id !== null && id !== undefined)
      ),
    ];

    const chartData = categoryIds
      .map((id) => {
        const field = careerFields.find((f) => f.category_id === id);
        if (!field || !field.scores) return null;

        const similarity = cosineSimilarity(riasecScores, field.scores);
        return {
          category_id: id,
          value: Math.round(similarity * 100),
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.value - a.value);

    // -------- Priority Map --------
    const categoryPriority = new Map();
    chartData.forEach((item, index) => {
      categoryPriority.set(item.category_id, index);
    });

    // -------- Final Career Sort --------
    return [...recommendedCareers].sort((a, b) => {
      const priorityA = categoryPriority.get(a.category_id);
      const priorityB = categoryPriority.get(b.category_id);

      if (priorityA !== undefined && priorityB !== undefined) {
        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }
        return (b.similarity || 0) - (a.similarity || 0);
      }

      if (priorityA === undefined) return 1;
      if (priorityB === undefined) return -1;
      return 0;
    });
  }, [recommendedCareers, scores]);

  return (
    <div id="print-root">
      {/* 1. Personality Assessment (2 strict A4 pages) */}
      <PrintablePersonalityStrengths scores={scores} language={language} />

      {/* 2. Career Interests (2 strict A4 pages) */}
      <PrintableCareerInterests scores={scores} language={language} />

      {/* 3. Aptitude & Skills (2 strict A4 pages) */}
      <PrintableAptitudeStrengths scores={scores} language={language} />

      {/* 4. Emotional Intelligence (2 strict A4 pages) */}
      <PrintableEqProfile scores={scores} language={language} />

      {/* 5. Learning Preferences (2 strict A4 pages) */}
      <PrintableLearningPreferences scores={scores} language={language} />

      {/* 6. Career Clusters & Options */}
      <PrintableCareerOptions
        scores={scores}
        careers={orderedCareers}
        language={language}
      />

      {/* 7. Selected Career Detailed Roadmaps */}
      {orderedCareers
        .filter((c) => selectedCareerIds.includes(c.id))
        .map((career) => (
          <div
            className="career-detail-wrapper"
            key={career.id}
            style={{
              pageBreakBefore: "always",
              breakBefore: "page",
              width: "210mm",
              boxSizing: "border-box",
              padding: "10mm 14mm",
              background: "#ffffff",
            }}
          >
            <PrintableCareerDetail
              key={career.id}
              career={career}
              language={language}
            />
          </div>
        ))}
    </div>
  );
}
