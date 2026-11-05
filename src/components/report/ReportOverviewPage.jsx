// src/components/report/ReportOverviewPage.jsx
import React from "react";

export default function ReportOverviewPage() {
  return (
    <div
      className="print-page font-sans text-gray-900 leading-relaxed"
      style={{
        width: "210mm",
        height: "297mm",
        maxHeight: "297mm",
        boxSizing: "border-box",
        padding: "18mm 18mm",
        background: "#ffffff",
        overflow: "hidden",
        pageBreakAfter: "always",
        breakAfter: "page",
      }}
    >
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
        title="Personality Snapshot"
        text="Your personality explains how you think, learn, and react across the Big Five dimensions. Knowing this helps you choose careers where you feel comfortable, confident, and motivated."
      />

      <OverviewRow
        icon="bi-heart"
        title="Career Interests"
        text="Your interests show what you naturally enjoy doing using the Holland Code framework. When your career matches your interests, learning becomes enjoyable and work feels meaningful."
      />

      <OverviewRow
        icon="bi-lightning-charge"
        title="Aptitude & Cognitive Strengths"
        text="Aptitude reflects your natural cognitive abilities like logical reasoning, numerical problem-solving, and verbal communication. These strengths help you perform better in suitable career paths."
      />

      <OverviewRow
        icon="bi-signpost-split"
        title="Career Clusters & Pathways"
        text="All 16 career clusters are evaluated and ranked based on your profile. Each pathway shows educational study routes, preparation steps, and future demand in the AI era."
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
