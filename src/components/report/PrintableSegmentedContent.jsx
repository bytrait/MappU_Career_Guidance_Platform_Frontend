// src/components/printables/PrintableSegmentedContent.jsx
import React from "react";
import parse from "html-react-parser";
import { segmentByHeadings } from "../CareerContent/HeadingSegmenter";
import PrintableSection from "./PrintableSection";

export default function PrintableSegmentedContent({ html }) {
  if (!html) return null;

  const sections = segmentByHeadings(html);

  if (!sections.length) {
    return (
      <p style={{ color: "#6b7280", fontSize: "14px" }}>
        No structured content available.
      </p>
    );
  }

  return (
    <div>
      {sections.map((section, index) => (
        <PrintableSection
          key={index}
          title={section.heading}
        >
          {parse(section.content)}
        </PrintableSection>
      ))}
    </div>
  );
}
