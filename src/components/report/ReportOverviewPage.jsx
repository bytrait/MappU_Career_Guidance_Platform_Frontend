// src/components/report/ReportOverviewPage.jsx
import React from "react";

export default function ReportOverviewPage() {
  return (
    <div className="w-[210mm] min-h-[297mm] px-[18mm] py-[28mm] text-gray-900 font-sans leading-relaxed print-page">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        Brief Overview
      </h1>

      {/* Intro */}
      <p className="text-base text-gray-700 mb-10 max-w-3xl">
        This report helps you understand yourself better and make confident
        decisions about your future. It combines your personality, interests,
        and aptitude to guide you toward the right career direction.
      </p>

      <OverviewRow
        icon="bi-person-lines-fill"
        title="Personality Assessment"
        text="Your personality explains how you think, learn, and react in different situations. Knowing this helps you choose careers where you feel comfortable, confident, and motivated."
      />

      <OverviewRow
        icon="bi-heart"
        title="Interest Analysis"
        text="Your interests show what you naturally enjoy doing. When your career matches your interests, learning becomes enjoyable and work feels meaningful."
      />

      <OverviewRow
        icon="bi-lightning-charge"
        title="Aptitude & Skills"
        text="Aptitude reflects your natural abilities like logical thinking, communication, and problem-solving. These strengths help you perform better in suitable career paths."
      />

      <OverviewRow
        icon="bi-graph-up-arrow"
        title="Skill Improvement"
        text="This section highlights which skills you can improve to become future-ready. With the right practice and guidance, every skill can grow."
      />

      <OverviewRow
        icon="bi-signpost-split"
        title="Career Pathways"
        text="Careers are recommended by combining your personality, interests, and aptitude. Each pathway shows education steps, skills to build, and long-term growth."
        isLast
      />

      {/* Closing */}
      <p className="mt-10 text-gray-600 italic max-w-3xl">
        This report is not about limiting choices — it is about helping you
        discover your strengths and move forward with clarity and confidence.
      </p>
    </div>
  );
}

/* ---------------------------------------
   Minimal Two-Column Row with Lines
--------------------------------------- */

function OverviewRow({ icon, title, text, isLast = false }) {
  return (
    <div className={`relative py-6 ${!isLast ? "border-b border-gray-300" : ""}`}>
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-4 flex items-start gap-3 pr-6">
          <i className={`bi ${icon} text-xl text-gray-700`} />
          <h2 className="text-base font-semibold">
            {title}
          </h2>
        </div>

        {/* Vertical Divider */}
        <div className="absolute left-[33.33%] top-0 h-full border-l border-gray-300" />

        {/* Right Column */}
        <div className="col-span-8 pl-6">
          <p className="text-sm text-gray-700">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
