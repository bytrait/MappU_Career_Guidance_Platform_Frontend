import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Target,
  Rocket,
  ArrowRight,
  Play,
} from "lucide-react";

import {
  fetchUserProgress,
  fetchUserDetailsById,
} from "../../services/userAssessmentProgressService";

const YOUTUBE_VIDEO_ID = "VdQAaaCm0Hxh971d";

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

  const features = [
    {
      icon: Brain,
      title: "Personality Insights",
      description:
        "Understand your strengths, mindset, and working style.",
    },
    {
      icon: Target,
      title: "Career Mapping",
      description:
        "Explore careers aligned with your interests and ambitions.",
    },
    {
      icon: Rocket,
      title: "Future Planning",
      description:
        "Build a roadmap for your academic and professional growth.",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />

          <p className="text-gray-600 font-medium">
            Loading your experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-180px] right-[-120px] w-[420px] h-[420px] bg-blue-100 rounded-full blur-3xl opacity-60" />

        <div className="absolute bottom-[-180px] left-[-120px] w-[360px] h-[360px] bg-indigo-100 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* NAVBAR */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-blue-600">
              Bytrait
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              AI Career Guidance Platform
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />

            <span className="text-sm font-medium text-gray-700">
              Personalized Career Discovery
            </span>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-[1.05fr_520px] gap-16 items-center">
          
          {/* LEFT SIDE */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-blue-600" />

              <span className="text-sm font-semibold text-blue-700">
                Welcome Experience
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight text-gray-900">
              Discover Your
              <br />

              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                Perfect Career
              </span>
            </h1>

            {/* User Welcome */}
            <div className="mt-8">
              <p className="text-lg text-gray-500 mb-2">
                Welcome,
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {userDetails?.fullName || "Student"}
              </h2>
            </div>

            {/* Description */}
            <p className="mt-6 text-lg leading-relaxed text-gray-600 max-w-2xl">
              Unlock your personality strengths, discover career opportunities,
              and build a future roadmap personalized to your ambitions,
              interests, and long-term goals.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-5 mt-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className="group bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center mb-5 shadow-lg shadow-blue-100">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_20px_80px_rgba(15,23,42,0.08)] overflow-hidden">
              
              {/* TOP HEADER */}
              <div className="flex items-center gap-4 p-6 border-b border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-100 shrink-0">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Welcome to Bytrait
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Watch the introduction before getting started
                  </p>
                </div>
              </div>

              {/* VIDEO */}
              <div className="relative aspect-video bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/gxx6rqKimzQ?si=VdQAaaCm0Hxh971d"
                  title="Welcome Video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* CONTENT */}
              <div className="p-7">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    Your Future Starts Here
                  </h4>

                  <p className="text-sm leading-7 text-gray-600">
                    Discover your strengths, explore career opportunities,
                    and build a personalized roadmap designed around your
                    ambitions, interests, and future goals.
                  </p>
                </div>

                {/* CTA SECTION */}
                <div className="mt-7 flex items-center justify-between gap-4 flex-wrap">
                  
                  {/* Left Text */}
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Begin Your Career Discovery
                    </p>

                  </div>

                  {/* Button */}
                  <button
                    onClick={() => navigate("/assessment")}
                    className="group h-14 px-7 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold flex items-center gap-3 shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                  >
                    Get Started

                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}