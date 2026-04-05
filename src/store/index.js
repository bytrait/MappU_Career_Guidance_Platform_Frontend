import { configureStore } from "@reduxjs/toolkit";
import reportReducer from "./reportSlice";

// Load persisted state
function loadState() {
  try {
    const selectedCareer = localStorage.getItem("selectedCareer");
    const language = localStorage.getItem("language");
    const economicStatus = localStorage.getItem("economicStatus");

    return {
      report: {
        language: language || "en",
        economicStatus: economicStatus || null,
        selectedCareer: selectedCareer ? JSON.parse(selectedCareer) : null,

        // these will be populated after API calls anyway
        scores: [],
        recommendedCareers: [],
      },
    };
  } catch (e) {
    console.warn("Failed to load state", e);
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    report: reportReducer,
  },
  preloadedState: loadState(),
});

export default store;
