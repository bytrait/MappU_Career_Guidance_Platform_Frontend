import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Target,
  Rocket,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  fetchUserProgress,
  fetchUserDetailsById,
} from "../services/userAssessmentProgressService";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#012A9E] via-[#163db8] to-[#4140FE]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/80 font-medium text-lg">
            Preparing your assessment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#012A9E] via-[#163db8] to-[#4140FE]">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-120px] right-[-100px] w-[340px] h-[340px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-140px] left-[-120px] w-[380px] h-[380px] rounded-full bg-[#7C8CFF]/20 blur-3xl" />
        <div className="absolute top-[20%] left-[8%] w-40 h-40 border border-white/10 rounded-full" />
        <div className="absolute bottom-[15%] right-[12%] w-24 h-24 border border-white/10 rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-[1.1fr_500px] gap-10 lg:gap-16 items-center w-full">
          {/* Left Side */}
          <div className="text-white">
            

            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.35em] text-white/60 mb-5">
                Career Gauidance Platform
              </p>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
                Mapp My <br />
                <span className="">University</span>
              </h1>

              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
                Dear{" "}
                <span className="">
                  {userDetails?.fullName || "Student"}
                </span>
              </h2>

              <p className="text-white/75 text-lg sm:text-xl leading-relaxed max-w-2xl">
                Welcome to your personalized journey of career discovery,
                self-understanding, and future planning.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6" />
                </div>

                <h3 className="text-sm font-semibold mb-2">
                  Personality Insights
                </h3>

                <p className="text-xs text-white/70 leading-relaxed">
                  Understand your strengths, traits, and working style.
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>

                <h3 className="text-sm font-semibold mb-2">
                  Career Mapping
                </h3>

                <p className="text-xs text-white/70 leading-relaxed">
                  Find career paths that align with your interests.
                </p>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-md hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6" />
                </div>

                <h3 className="text-sm font-semibold mb-2">
                  Future Planning
                </h3>

                <p className="text-xs text-white/70 leading-relaxed">
                  Explore opportunities and prepare for your future.
                </p>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-black/10 blur-3xl rounded-[32px]" />

            <div className="relative bg-white rounded-[32px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.18)] p-7 sm:p-8">
              <div className="mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7 text-[#012A9E]" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome Aboard
                </h3>

                <p className="text-sm text-gray-500">
                  Your assessment experience begins here
                </p>
              </div>

              <div className="space-y-5">
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  We’re thrilled to have you embark on a journey of
                  self-discovery and career exploration. Our personality and
                  career interest tests are designed to uncover your unique
                  traits and passions, guiding you towards a career path that
                  aligns with who you are.
                </p>

                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Through our comprehensive assessments, you'll gain insights
                  into your personality strengths and career inclinations.
                  We’ll map out detailed career paths tailored to your
                  individuality, offering the most suitable options that
                  resonate with your personality and aspirations.
                </p>

                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Get ready to uncover new insights, explore exciting
                  possibilities, and pave the way towards a fulfilling career
                  that reflects the best of you. Let's embark on this
                  enlightening journey together!
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  className="group w-full bg-[#012A9E] hover:bg-[#001f78] text-white py-4 rounded-2xl font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2"
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