import React, { useState, useEffect } from "react";
import { savePreference } from "../services/preferenceService";
import { useNavigate } from "react-router-dom";

import congrasIms from "../assets/congrats.png"
import { fetchUserDetailsById } from "../services/userAssessmentProgressService";

export default function CongratulationsPage() {
  const [preferredLanguage, setPreferredLanguage] = useState("en");
  const [economicStatus, setEconomicStatus] = useState("stable");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const userDetails = await fetchUserDetailsById();
      setUserDetails(userDetails);
    };
    getUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await savePreference({ preferredLanguage, economicStatus });
      setSuccess(true);
      navigate("/report");
    } catch (err) {
      console.error("Failed to save preference:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* 🎉 Image */}
      <img
        src={congrasIms} // your screenshot image path
        alt="Congratulations"
        className="w-32 h-32 mb-6"
      />

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Congratulations, {userDetails?.fullName}!
      </h1>

      {/* Subheading */}
      <p className="text-lg text-center mb-6">
        Let’s take a look what your Career Report says.
      </p>

      {/* Paragraphs from screenshot */}
      <p className="text-center max-w-2xl mb-4">
        Congratulations {userDetails?.fullName} for taking the first step towards a successful,
        satisfying and meaningful career.
      </p>
      <p className="text-center  max-w-2xl mb-8">
        This confidential report is based on your responses to the personality
        and career interest tests. The analysis of your responses is then used
        to find out potential career options that best suit your personality
        strengths and career interests so you can choose appropriate study
        options and career paths.
      </p>

      {/* Your Form (unchanged) */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-8 w-full max-w-md space-y-6"
      >
        {/* Preferred Language */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Language
          </label>
          <select
            value={preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="en">English</option>
            <option value="mr">Marathi</option>
          </select>
        </div>

        {/* Economic Status */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Economic Status
          </label>
          <select
            value={economicStatus}
            onChange={(e) => setEconomicStatus(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="stable">Stable</option>
            <option value="weak">Weak</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 
    ${loading
              ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed animate-pulse"
              : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
            }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Generating Report...</span>
            </>
          ) : (
            "Generate Career Report"
          )}
        </button>

      </form>
    </div>
  );
}
