// src/components/report/ReportIndexPage.jsx
import React from "react";

export default function ReportIndexPage() {
  return (
    <div className="w-[210mm] min-h-[297mm] px-[18mm] py-[28mm] text-gray-900 font-sans print-page">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        Index
      </h1>

      {/* Intro */}
      <p className="text-base text-gray-700 mb-8 max-w-3xl">
        This index outlines the sections included in your career guidance report.
        Sections are arranged in the order they appear.
      </p>

      {/* TABLE */}
      <div className="mt-6">
        {/* Table Header */}
        <div className="grid grid-cols-12 border-b-2 border-gray-700 pb-3 text-sm font-semibold">
          <div className="col-span-10">Section</div>
          <div className="col-span-2 text-right">Page</div>
        </div>

        {/* Rows */}
        <IndexRow
          number="1"
          title="Your Personality Snapshot"
          description="Summary of your personality traits and their influence on behaviour and career preferences."
          page="1"
        />

        <IndexRow
          number="2"
          title="Your Career Interests"
          description="Overview of your interest areas and the career domains that attract you."
          page="2"
        />

        <IndexRow
          number="3"
          title="Your Learning Abilities"
          description="Insights into your aptitude, learning strengths, and areas for improvement."
          page="3"
        />

        <IndexRow
          number="4"
          title="Career Clusters"
          description="Top career fields aligned with your personality, interests, and abilities."
          page="4"
        />

        <IndexRow
          number="5"
          title="Careers recommended for You"
          description="List of top recommended careers based on your assessment results."
          page="5"
        />

        <IndexRow
          number="6"
          title="Career details & Pathways"
          description="Detailed step-by-step guidance for earch selected recommended career."
          page="10 - End"
        />
      </div>
    </div>
  );
}

/* ---------------------------------------
   Table Row
--------------------------------------- */

function IndexRow({ number, title, description, page }) {
  return (
    <div className="grid grid-cols-12 py-4 border-b border-gray-300">
      {/* Section Column */}
      <div className="col-span-10">
        <h2 className="text-base font-semibold">
          {number}. {title}
        </h2>
        <p className="text-sm text-gray-700 mt-1">
          {description}
        </p>
      </div>

      {/* Page Column */}
      <div className="col-span-2 text-right text-sm font-semibold text-gray-700">
        {page}
      </div>
    </div>
  );
}
