// src/utils/clusterMatching.util.js
import careerClustersData from "../data/careerClustersDatabase.json";

/* ---------------- APTITUDE MAPPING ---------------- */
// Maps database codes to assessment trait codes
export const APTITUDE_CODE_MAP = {
  LOG: "LR", // Logical Reasoning
  NUM: "NA", // Numerical Ability
  READ: "LA", // Language / Reading Ability
  MECH: "MR", // Mechanical Reasoning
  SPA: "SA", // Spatial Ability
};

export const LEVEL_SCORES = {
  Low: 1,
  Average: 2,
  Good: 3,
  Excellent: 4,
};

export function scoreToLevel(rawScore) {
  const score = Number(rawScore) || 0;
  if (score >= 9) return { level: "Excellent", num: 4, text: "Excellent" };
  if (score >= 7) return { level: "Good", num: 3, text: "Good" };
  if (score >= 4) return { level: "Average", num: 2, text: "Average" };
  return { level: "Low", num: 1, text: "Low" };
}

/* ---------------- HOLLAND CODE MATCHING ---------------- */

export function extractTopRiasec(scores = []) {
  const riasecScores = scores.filter((s) => s.assessmentType === "RIASEC");
  const defaultOrder = ["R", "I", "A", "S", "E", "C"];

  const traitMap = {};
  defaultOrder.forEach((code) => {
    const item = riasecScores.find((s) => s.traitOrCategoryCode === code);
    traitMap[code] = item ? Number(item.score) || 0 : 0;
  });

  const sorted = Object.entries(traitMap)
    .sort((a, b) => b[1] - a[1])
    .map(([code]) => code);

  return {
    top3: sorted.slice(0, 3),
    top3String: sorted.slice(0, 3).join("-"),
    scoresMap: traitMap,
  };
}

export function calculateClusterFit(userTop3, clusterHollandCode, userScoresMap, clusterWeights) {
  const clusterLetters = (clusterHollandCode || "").replace(/[^A-Z]/g, "").split("");
  
  // 1. Position-weighted Holland letter overlap
  let hollandScore = 0;
  userTop3.forEach((userLetter, uIdx) => {
    const cIdx = clusterLetters.indexOf(userLetter);
    if (cIdx !== -1) {
      if (uIdx === cIdx) {
        hollandScore += (3 - uIdx) * 10; // Exact position match: 30, 20, 10
      } else {
        hollandScore += 10 - Math.abs(uIdx - cIdx) * 3; // Shifted match
      }
    }
  });

  // 2. Cosine similarity between raw RIASEC vector and cluster RIASEC weights
  let dot = 0;
  let userMag = 0;
  let clusterMag = 0;
  ["R", "I", "A", "S", "E", "C"].forEach((k) => {
    const u = userScoresMap[k] || 0;
    const c = (clusterWeights && clusterWeights[k]) || 0;
    dot += u * c;
    userMag += u * u;
    clusterMag += c * c;
  });

  const cosineSim = (userMag > 0 && clusterMag > 0) ? (dot / (Math.sqrt(userMag) * Math.sqrt(clusterMag))) : 0;
  const combinedScore = hollandScore + cosineSim * 20;

  return {
    hollandScore,
    cosineSim,
    combinedScore,
  };
}

export function getFitTier(rank, combinedScore) {
  if (rank === 1) {
    return {
      tier: "Best Match",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      pillColor: "#2563eb",
      lightBg: "#eff6ff",
    };
  }
  if (rank <= 3) {
    return {
      tier: "Strong Fit",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      pillColor: "#059669",
      lightBg: "#ecfdf5",
    };
  }
  if (rank <= 6) {
    return {
      tier: "Good Fit",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
      pillColor: "#d97706",
      lightBg: "#fffbeb",
    };
  }
  return {
    tier: "Exploring Fit",
    badgeClass: "bg-slate-50 text-slate-600 border-slate-200",
    pillColor: "#64748b",
    lightBg: "#f8fafc",
  };
}

/* ---------------- MAIN CLUSTER MATCHING FUNCTION ---------------- */

export function getRankedClusters(scores = []) {
  const { top3, top3String, scoresMap } = extractTopRiasec(scores);

  // Extract Aptitude scores
  const aptScores = scores.filter((s) => s.assessmentType === "APTITUDE");
  const userAptitudes = {};
  Object.entries(APTITUDE_CODE_MAP).forEach(([dbCode, testCode]) => {
    const item = aptScores.find((s) => s.traitOrCategoryCode === testCode);
    const scoreVal = item ? Number(item.score) || 0 : 0;
    userAptitudes[dbCode] = {
      rawScore: scoreVal,
      ...scoreToLevel(scoreVal),
    };
  });

  const clusterList = Object.values(careerClustersData);

  const scoredClusters = clusterList.map((cluster) => {
    const fit = calculateClusterFit(
      top3,
      cluster.hollandCode,
      scoresMap,
      cluster.riasecWeights
    );
    return {
      ...cluster,
      matchScore: fit.combinedScore,
      userHollandTop3: top3String,
    };
  });

  // Sort descending by match score
  scoredClusters.sort((a, b) => b.matchScore - a.matchScore);

  return scoredClusters.map((cluster, index) => {
    const rank = index + 1;
    const tierInfo = getFitTier(rank, cluster.matchScore);
    return {
      ...cluster,
      rank,
      ...tierInfo,
      userAptitudes,
    };
  });
}
