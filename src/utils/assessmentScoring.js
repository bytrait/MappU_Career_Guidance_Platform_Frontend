/**
 * Assessment score calculators.
 * Scores are computed on the client and submitted to the API as integers.
 *
 * Scales:
 * - OCEAN / RIASEC → 0–30 per trait
 * - APTITUDE       → correct-count per category (typically 0–10)
 * - EQ / LEARNING  → 0–100 per dimension
 *   (EQ official n=5: ((sum-5)/20)*100 ≡ ((avg-1)/4)*100)
 */

function adjustedLikert(raw, reverse) {
  if (raw == null) return null;
  return reverse ? 6 - raw : raw;
}

function collectLikertSums(questions, answers) {
  const scoreMap = {};
  const questionCount = {};

  for (const q of questions) {
    const adjusted = adjustedLikert(answers[q.id], q.reverse);
    if (adjusted == null) continue;

    const code = q.trait.code;
    scoreMap[code] = (scoreMap[code] || 0) + adjusted;
    questionCount[code] = (questionCount[code] || 0) + 1;
  }

  return { scoreMap, questionCount };
}

/** Normalize trait average onto 0–30 (OCEAN / RIASEC). */
export function scoreOceanOrRiasec(questions, answers, assessmentType) {
  const { scoreMap, questionCount } = collectLikertSums(questions, answers);

  return Object.entries(scoreMap).map(([code, rawScore]) => {
    const n = questionCount[code];
    const normalized = Math.round((rawScore / (n * 5)) * 30);
    return {
      assessmentType,
      traitOrCategoryCode: code,
      score: normalized,
    };
  });
}

/** Count correct MCQ answers per aptitude category. */
export function scoreAptitude(questions, answers, assessmentType = "APTITUDE") {
  const scoreMap = {};

  for (const q of questions) {
    const selected = q.options?.find((opt) => opt.id === answers[q.id]);
    const isCorrect = selected?.isCorrect ? 1 : 0;
    const code = q.trait.code;
    scoreMap[code] = (scoreMap[code] || 0) + isCorrect;
  }

  return Object.entries(scoreMap).map(([code, score]) => ({
    assessmentType,
    traitOrCategoryCode: code,
    score,
  }));
}

/**
 * 0–100 preference / capability index from Likert items.
 * Works for full EQ (5/dim), Learning (4/dim), and short demo sets.
 */
function scoreZeroToHundred(questions, answers, assessmentType) {
  const { scoreMap, questionCount } = collectLikertSums(questions, answers);

  return Object.entries(scoreMap).map(([code, rawScore]) => {
    const n = questionCount[code];
    const avg = rawScore / n;
    const score = Math.round(((avg - 1) / 4) * 100);
    return {
      assessmentType,
      traitOrCategoryCode: code,
      score,
    };
  });
}

export function scoreEq(questions, answers) {
  return scoreZeroToHundred(questions, answers, "EQ");
}

export function scoreLearning(questions, answers) {
  return scoreZeroToHundred(questions, answers, "LEARNING");
}

export function calculateAssessmentScores(assessmentType, questions, answers) {
  switch (assessmentType) {
    case "APTITUDE":
      return scoreAptitude(questions, answers, assessmentType);
    case "EQ":
      return scoreEq(questions, answers);
    case "LEARNING":
      return scoreLearning(questions, answers);
    case "OCEAN":
    case "RIASEC":
    default:
      return scoreOceanOrRiasec(questions, answers, assessmentType);
  }
}

export function assessmentTitle(assessmentType) {
  switch (assessmentType) {
    case "OCEAN":
      return "Welcome to Personality Assessment";
    case "RIASEC":
      return "RIASEC Career Interest Test";
    case "APTITUDE":
      return "Aptitude Test";
    case "EQ":
      return "Emotional Intelligence Profile";
    case "LEARNING":
      return "Learning Preferences";
    default:
      return "Assessment";
  }
}
