import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
  economicStatus: null,

  scores: [],                   // RIASEC + OCEAN + Aptitude
  recommendedCareers: [],       // Top 10 careers
  selectedCareer: null,         // { id, title, description, steps[] }
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {

    // LANGUAGE
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
    },

    // ECONOMIC STATUS
    setEconomicStatus: (state, action) => {
      state.economicStatus = action.payload;
      localStorage.setItem("economicStatus", action.payload);
    },

    // USER SCORES
    setScores: (state, action) => {
      state.scores = action.payload;
      // do NOT store scores in localStorage — too large
    },

    // RECOMMENDED CAREERS
    setRecommendedCareers: (state, action) => {
      state.recommendedCareers = action.payload;
      // do NOT store this in localStorage — dynamic per user
    },

    // SELECTED CAREER
    setSelectedCareer: (state, action) => {
      state.selectedCareer = action.payload;
      localStorage.setItem("selectedCareer", JSON.stringify(action.payload));
    },

    clearSelectedCareer: (state) => {
      state.selectedCareer = null;
      localStorage.removeItem("selectedCareer");
    }
  },
});

export const {
  setLanguage,
  setEconomicStatus,
  setScores,
  setRecommendedCareers,
  setSelectedCareer,
  clearSelectedCareer
} = reportSlice.actions;

export default reportSlice.reducer;
