// src/utils/profileHelper.js

function scaleOcean(score) {
  return Math.round((score / 50) * 10);
}

function scaleRiasec(score) {
  return Math.round((score / 30) * 10);
}

function buildProfileVec(apiData) {
  const oceanCodes = ["O", "C", "E", "A", "N"];
  const riasecCodes = ["R", "I", "A", "S", "E", "C"];
  const profileVec = [];

  // OCEAN scores
  oceanCodes.forEach((code) => {
    const item = apiData.find(
      (s) => s.assessmentType === "OCEAN" && s.traitOrCategoryCode === code
    );
    profileVec.push(item ? scaleOcean(item.score) : 0);
  });

  // RIASEC scores
  riasecCodes.forEach((code) => {
    const item = apiData.find(
      (s) => s.assessmentType === "RIASEC" && s.traitOrCategoryCode === code
    );
    profileVec.push(item ? scaleRiasec(item.score) : 0);
  });

  return profileVec;
}

// 🔹 Build full request body
export function buildCareerRequest(apiData, economic_status = "weak", language = "en") {
  return {
    profile_vec: buildProfileVec(apiData),
    economic_status,
    language,
  };
}
