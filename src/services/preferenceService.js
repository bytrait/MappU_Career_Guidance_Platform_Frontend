import API from "./axiosInstance";

// Save user preference
export const savePreference = async ({ preferredLanguage, economicStatus }) => {
  // Ensure values are in the correct case for the backend
  const payload = {
    preferredLanguage: preferredLanguage?.toLowerCase(),
    economicStatus: economicStatus?.toLowerCase(),
  };
  console.log("Saving preference with payload:", payload);
  const response = await API.post("/assessment/preference", payload);
  return response.data;
};

export const getPreference = async ()=>{
    const response = await API.get("/assessment/preference")
    return response.data;
}