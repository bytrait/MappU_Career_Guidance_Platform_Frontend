// src/pages/demo/DemoWelcomePage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DemoWelcomePage() {
  const navigate = useNavigate();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  return (
    <div className="min-h-screen flex justify-center items-start p-2 sm:p-4 md:p-6 lg:p-8 bg-[#012A9E]">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-4 sm:p-6 md:p-8">

        {/* Greeting */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
          Dear <span className="text-primary">Student</span>
        </h2>

        {/* Intro — exactly same content */}
        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-4">
          Welcome to <span className="text-primary">Mapp My </span><span className="text-accent">University</span>!
        </h3>

        <p className="text-gray-700 mb-2 sm:mb-4 leading-relaxed text-sm sm:text-base">
          We’re thrilled to have you embark on a journey of self-discovery and career exploration.
          Our personality and career interest tests are designed to uncover your unique traits and passions, guiding you towards a career path that aligns with who you are.
        </p>

        <p className="text-gray-700 mb-2 sm:mb-4 leading-relaxed text-sm sm:text-base">
          Through our comprehensive assessments, you'll gain insights into your personality strengths and career inclinations.
          We’ll map out detailed career paths tailored to your individuality, offering the most suitable options that resonate with your personality and aspirations.
        </p>

        <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
          Get ready to uncover new insights, explore exciting possibilities, and pave the way towards a fulfilling career that reflects the best of you.
          Let's embark on this enlightening journey together!
        </p>

        {/* Video — unchanged */}
        {/* <p className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
          Please watch the video below before you begin
        </p>

        <div className="w-full flex justify-center mb-4">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl aspect-video">
            <iframe
              className="w-full h-48 sm:h-64 md:h-72 lg:h-80 rounded-lg"
              src="https://www.youtube.com/embed/gxx6rqKimzQ?si=VdQAaaCm0Hxh971d"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div> */}

        {/* Button */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-2 mt-2">
          <button
            className="bg-accent hover:bg-success text-white px-4 sm:px-6 py-2 rounded-lg w-full sm:w-auto text-base sm:text-lg"
            onClick={() => navigate("/demo/assessment")}
          >
            Let&apos;s Start
          </button>
        </div>
      </div>
    </div>
  );
}
