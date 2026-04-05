// src/utils/extractPersonalityData.js
import traitsData from "../data/personality_traits.json";

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

function getCategory(traitJsonKey, score, language) {
  let traitInfo = traitsData?.traits?.[traitJsonKey];

  // Handle Extroversion/Extraversion mismatch
  if (!traitInfo) {
    const fallback = {
      Extroversion: "Extraversion",
      Extraversion: "Extroversion",
    };
    const alt = fallback[traitJsonKey];
    if (alt) traitInfo = traitsData?.traits?.[alt];
  }

  if (!traitInfo) return { label: "", summary: "" };

  for (const cat of traitInfo.categories) {
    const [min, max] = cat.range.split("-").map(Number);
    if (score >= min && score <= max) {
      return {
        label: cat.label?.[language] || cat.label?.en || "",
        summary: cat.summary?.[language] || cat.summary?.en || "",
      };
    }
  }

  return { label: "", summary: "" };
}

export function extractPersonalityData(scores = [], language = "en") {
  const oceanScores = scores.filter((s) => s.assessmentType === "OCEAN");

  const ordered = ["O", "C", "E", "A", "N"];

  return ordered
    .map((code) => {
      const item = oceanScores.find((s) => s.traitOrCategoryCode === code);
      if (!item) return null;

      const traitJsonKey = TRAIT_JSON_KEY[code];
      const category = getCategory(traitJsonKey, item.score, language);

      return {
        traitCode: code,
        traitJsonKey,
        displayName:
          TRAIT_DISPLAY[code]?.[language] || TRAIT_JSON_KEY[code] || code,
        score: item.score,
        categoryLabel: category.label,
        summary: category.summary,
      };
    })
    .filter(Boolean);
}
