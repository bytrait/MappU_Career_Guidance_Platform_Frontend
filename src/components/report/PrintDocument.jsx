// src/components/PrintDocument.jsx
import React from "react";
import PrintablePersonalityStrengths from "./PrintablePersonalityStrengths";
import PrintableCareerInterests from "./PrintableCareerInterests";
import PrintableAptitudeStrengths from "./PrintableAptitudeStrengths";
import PrintableCareerOptions from "./PrintableCareerOptions";
import PrintableCareerDetail from "./PrintableCareerDetail";

import careerFields from "../../data/career_fields.json";
import { useMemo } from "react";
import PersonalityStrengths from "./PersonalityStrengths";


/** 
 * PrintDocument
 * - A simple React component that renders the printable report only.
 * - This component will be mounted into an offscreen container and its innerHTML
 *   copied into a print iframe.
 *
 * Props:
 * - scores, language, userDetails
 * - recommendedCareers: full array (we'll optionally render selected ones after)
 * - selectedCareerIds: array of ids (use PrintableCareerOptions to render all; optional separate rendering handled by ReportPage)
 * - selectedCareersHtml: OPTIONAL prebuilt HTML fragments for career sections (string) — if passed, Render them after main report.
 */

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
  const riasecScores = scores
    .filter((s) => s.assessmentType === "RIASEC")
    .reduce((acc, s) => {
      acc[s.traitOrCategoryCode] = s.score;
      return acc;
    }, {});

  // -------- Build Chart Data (same logic as PrintableCareerOptions) --------
  const categoryIds = [
    ...new Set(
      recommendedCareers
        .map((c) => c.category_id)
        .filter((id) => id !== null && id !== undefined)
    ),
  ];

  const chartData = categoryIds
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
        category_id: id,
        value: Math.round(weighted * 100),
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
      {/* SINGLE-PAGE SECTIONS */}
      <PrintablePersonalityStrengths
        scores={scores}
        language={language}
      />
        {/* <PersonalityStrengths scores={scores} language={language} /> */}

      <PrintableCareerInterests
        scores={scores}
        language={language}
      />

      <PrintableAptitudeStrengths
        scores={scores}
        language={language}
      />

      {/* MULTI-PAGE SECTION (handles its own pages) */}
      <PrintableCareerOptions
        scores={scores}
        careers={orderedCareers}
        language={language}
      />

      {/* CAREER DETAIL PAGES (each renders its own print-page) */}
      {orderedCareers
        .filter(c => selectedCareerIds.includes(c.id))
        .map(career => (
          <div className="mb-[60px]" key={career.id}>
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


