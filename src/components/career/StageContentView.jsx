// src/components/career/StageContentView.jsx
import React, { useEffect, useRef, useState } from "react";
import StageContentCard from "./StageContentCard";
import { cleanHtmlContent } from "../../utils/cleanHtmlContent";

export default function StageContentView({ step, language = "en" }) {
  const containerRef = useRef(null);

  const [visible, setVisible] = useState(true);
  const [animKey, setAnimKey] = useState(0);

  // Trigger animation + auto-scroll when the stage changes
  useEffect(() => {
    // fade-out animation
    setVisible(false);

    const t = setTimeout(() => {
      setAnimKey((k) => k + 1);
      setVisible(true);

      // 🔥 Scroll to top ONLY inside content container
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }, 200);

    return () => clearTimeout(t);
  }, [step?.order]);

  if (!step) {
    return (
      <div className="text-gray-500 py-8 text-center">
        {language === "mr" ? "सामग्री उपलब्ध नाही." : "No content available."}
      </div>
    );
  }

  console.log("Rendering StageContentView for step:", step);

  return (
    <div
      ref={containerRef}
      className="mt-6 max-h-[75vh] overflow-y-auto pr-2"
    >
      <div
        key={animKey}
        className={`transition-all duration-300 
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}
        `}
      >
        {/* <StageContentCard step={step} language={language} /> */}
        <div dangerouslySetInnerHTML={{ __html: cleanHtmlContent(step.content) || "<p>No content available.</p>" }} />
      </div>
    </div>
  );
}
