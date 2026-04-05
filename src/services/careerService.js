// src/services/careerService.js
import API from "./axiosInstance";
import { buildCareerRequest } from "../utils/profileHelper";

// Call recommendation endpoint
export const getRecommendedCareers = async (scoresData, economic_status = "weak", language = "en") => {
  const body = buildCareerRequest(scoresData, economic_status, language);
  console.log("Career Request Body:", body);
  return API.post("/careers/recommend/v2", body);
};


export const fetchCareerTitles = async (page = 1, limit = 20) => {
  const res = await API.get(`/careers/titles`, {
    params: { page, limit },
  });
  return res.data;
};

// -----------------------
// DETAIL VIEW
// -----------------------
export const fetchCareerDetails = async (careerId) => {
  const res = await API.get(`/careers/details/${careerId}`);
  return res.data;
};