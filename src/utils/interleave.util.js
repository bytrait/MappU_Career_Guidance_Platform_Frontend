/**
 * Deterministic Static Question Interleaving
 * 
 * Ensures questions across different traits/categories are mixed in a fixed,
 * static, reproducible sequence so that:
 * 1. Questions are not presented in monotonous trait blocks (all O, then all C...).
 * 2. The order is 100% identical on every browser, device, and page reload.
 */

const TRAIT_ORDER_MAP = {
  OCEAN: ["E", "A", "C", "N", "O"],
  RIASEC: ["R", "I", "A", "S", "E", "C"],
  APTITUDE: ["LA", "NA", "AR", "SR", "MR"],
  EQ: ["SAW", "SMG", "MOT", "EMP", "SKL"],
  LEARNING: ["VIS", "AUD", "KIN", "RDW"],
};

export const interleaveQuestions = (questions = [], assessmentType = "OCEAN") => {
  if (!Array.isArray(questions) || questions.length === 0) return [];

  const preferredTraitOrder = TRAIT_ORDER_MAP[assessmentType] || [];

  // Group questions by their trait code
  const traitGroups = {};
  for (const q of questions) {
    const traitCode = q.trait?.code || "DEFAULT";
    if (!traitGroups[traitCode]) {
      traitGroups[traitCode] = [];
    }
    traitGroups[traitCode].push(q);
  }

  // Sort each trait's questions by internal order (or id if order is missing)
  for (const code of Object.keys(traitGroups)) {
    traitGroups[code].sort((a, b) => {
      const orderA = typeof a.order === "number" ? a.order : 0;
      const orderB = typeof b.order === "number" ? b.order : 0;
      if (orderA !== orderB) return orderA - orderB;
      return String(a.id).localeCompare(String(b.id));
    });
  }

  // Determine the sequence of trait codes to iterate through
  const presentCodes = Object.keys(traitGroups);
  const orderedCodes = [
    ...preferredTraitOrder.filter((c) => presentCodes.includes(c)),
    ...presentCodes.filter((c) => !preferredTraitOrder.includes(c)),
  ];

  // Interleave round-robin across traits
  const interleaved = [];
  let index = 0;
  let hasMore = true;

  while (hasMore) {
    hasMore = false;
    for (const code of orderedCodes) {
      const group = traitGroups[code];
      if (group && index < group.length) {
        interleaved.push(group[index]);
        hasMore = true;
      }
    }
    index++;
  }

  return interleaved;
};
