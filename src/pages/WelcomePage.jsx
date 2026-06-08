import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Target, Rocket, ArrowRight } from "lucide-react";
import {
  fetchUserProgress,
  fetchUserDetailsById,
} from "../services/userAssessmentProgressService";
import mapuLogo from "../assets/bytrait_logo.png";

export default function WelcomePage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const user = await fetchUserDetailsById();
        setUserDetails(user);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    getUserDetails();
  }, []);

  useEffect(() => {
    fetchUserProgress()
      .then((progress) => {
        if (progress?.currentStage === null) {
          navigate("/report");
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch progress", err);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-dvh max-h-dvh overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-blue-100/80">
        <div className="flex flex-col items-center gap-4">
          <img
            src={mapuLogo}
            alt="Mapp My University"
            className="h-11 w-auto object-contain"
          />
          <div className="w-11 h-11 border-4 border-[#012A9E]/15 border-t-[#012A9E] rounded-full animate-spin" />
          <p className="text-slate-600 font-medium text-base">
            Preparing your assessment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh max-h-dvh overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-blue-100/70">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-6 lg:py-8 flex items-center">
        <div className="grid lg:grid-cols-[1.08fr_460px] xl:grid-cols-[1.1fr_480px] gap-6 lg:gap-10 xl:gap-12 items-center w-full min-h-0">
          {/* Left Side */}
          <div className="min-w-0 text-slate-900">
            <div className="mb-5 sm:mb-6 lg:mb-7">
              <p className="text-base sm:text-lg lg:text-xl font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4 sm:mb-5">
                Mapu Career Psychometric Assessment
              </p>

              <img
                src={mapuLogo}
                alt="Mapp My University"
                className="block h-16 sm:h-20 lg:h-24 w-auto max-w-full object-contain object-left mb-4 sm:mb-5"
              />

              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3">
                Dear{" "}
                <span className="text-[#012A9E]">
                  {userDetails?.fullName || "Student"}
                </span>
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                Welcome to your personalized journey of career discovery,
                self-understanding, and future planning.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
              <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-blue-200/80 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] text-[#012A9E] flex items-center justify-center mb-3">
                  <Brain className="w-5 h-5" />
                </div>

                <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                  Personality Insights
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Understand your strengths, traits, and working style.
                </p>
              </div>

              <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-blue-200/80 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] text-[#012A9E] flex items-center justify-center mb-3">
                  <Target className="w-5 h-5" />
                </div>

                <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                  Career Mapping
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Find career paths that align with your interests.
                </p>
              </div>

              <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-blue-200/80 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] text-[#012A9E] flex items-center justify-center mb-3">
                  <Rocket className="w-5 h-5" />
                </div>

                <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                  Future Planning
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Explore opportunities and prepare for your future.
                </p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="relative min-h-0 min-w-0">
            <div className="relative bg-white rounded-[28px] border border-slate-200/80 shadow-[0_20px_60px_rgba(15,23,42,0.12)] p-5 sm:p-6 lg:p-7 flex flex-col">
              <div className="mb-4 shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] flex items-center justify-center mb-3">
                  <Brain className="w-6 h-6 text-[#012A9E]" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
                  Welcome Aboard
                </h3>

                <p className="text-sm text-gray-500">
                  Your assessment experience begins here
                </p>
              </div>

              <div className="space-y-3 sm:space-y-3.5">
                <p className="text-gray-700 leading-relaxed text-sm">
                  We’re thrilled to have you embark on a journey of
                  self-discovery and career exploration. Our personality and
                  career interest tests are designed to uncover your unique
                  traits and passions, guiding you towards a career path that
                  aligns with who you are.
                </p>

                <p className="text-gray-700 leading-relaxed text-sm">
                  Through our comprehensive assessments, you'll gain insights
                  into your personality strengths and career inclinations.
                  We’ll map out detailed career paths tailored to your
                  individuality, offering the most suitable options that
                  resonate with your personality and aspirations.
                </p>

                <p className="text-gray-700 leading-relaxed text-sm">
                  Get ready to uncover new insights, explore exciting
                  possibilities, and pave the way towards a fulfilling career
                  that reflects the best of you. Let's embark on this
                  enlightening journey together!
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 shrink-0">
                <button
                  type="button"
                  className="group w-full bg-[#012A9E] hover:bg-[#001f78] text-white py-3.5 sm:py-4 rounded-2xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                  onClick={() => navigate("/assessment")}
                >
                  Let&apos;s Start
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
