export function renderDetailedCareerHTML(career, language = "en") {
  const text = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[language] || obj.value || "";
  };

  return `
    <div style="page-break-after: always; padding:20px;">
      ${text(career.full_html)}  
    </div>
  `;
}
