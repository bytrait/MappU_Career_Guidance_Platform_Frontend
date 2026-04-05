// src/components/career/StageContentCard.jsx
import React from "react";
import SafeHtml from "../common/SafeHtml";
import SegmentedContent from "../CareerContent/SegmentedContent";

export default function StageContentCard({ step = {}, language = "en" }) {
  const plainText = (step.content || "").replace(/<[^>]+>/g, "");
  const wordCount = plainText.trim() ? plainText.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="">
      
      {/* Title + Read time
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {language === "mr" && step.title_mr ? step.title_mr : step.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {readTime} {language === "mr" ? "मिनिट वाचन" : "min read"}
        </p>
      </header> */}

      {/* Content */}
      <div className="prose max-w-none text-gray-800 leading-relaxed">
              <SegmentedContent html={step.content} />
        
        {/* <SafeHtml html={step.content || "<p>No content available.</p>"} /> */}
      </div>
    </article>
  );
}
