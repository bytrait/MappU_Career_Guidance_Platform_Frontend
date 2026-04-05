// src/components/common/SafeHtml.jsx
import React from "react";
import DOMPurify from "dompurify";

/**
 * SafeHtml - sanitizes HTML from LLM before dangerouslySetInnerHTML
 * Usage: <SafeHtml html={someHtmlString} />
 */
export default function SafeHtml({ html = "" }) {
  const clean = DOMPurify.sanitize(html, { ADD_ATTR: ["target"] });
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
