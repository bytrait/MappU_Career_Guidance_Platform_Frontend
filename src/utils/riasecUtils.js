// utils/riasecUtils.js
export function getUserRiasecScores(scores) {
  const riasecScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  scores
    .filter((s) => s.assessmentType === "RIASEC")
    .forEach((s) => {
      riasecScores[s.traitOrCategoryCode] += s.score;
    });

  return riasecScores;
}


// utils/riasecUtils.js
export function calculateCareerMatches(userScores, careerFieldsJson) {
  return careerFieldsJson.map((career) => {
    const { scores } = career;
    let matchScore = 0;

    // Dot product (user * weights)
    for (let trait of ["R", "I", "A", "S", "E", "C"]) {
      matchScore += userScores[trait] * scores[trait];
    }

    return {
      careerField: career.careerField,
      matchScore: matchScore,
    };
  });
}

export function getTopCareers(userScores, careerFieldsJson, limit = 10) {
  const matches = calculateCareerMatches(userScores, careerFieldsJson);
  return matches.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
}
