export function calculateAssessmentScores(questions, answers) {
    const traitScores = {}; // { O: [5, 4], C: [3, 2], ... }
  
    questions.forEach(q => {
      const rawScore = answers[q.id];
      if (rawScore == null) return;
  
      const adjustedScore = q.reverse ? 6 - rawScore : rawScore;
  
      if (!traitScores[q.trait.code]) {
        traitScores[q.trait.code] = [];
      }
      traitScores[q.trait.code].push(adjustedScore);
    });
  
    const results = Object.entries(traitScores).map(([code, scores]) => {
      const average = Math.round(
        scores.reduce((sum, val) => sum + val, 0) / scores.length
      );
  
      return {
        traitOrCategoryCode: code,
        score: average,
      };
    });
  
    return results;
  }
  