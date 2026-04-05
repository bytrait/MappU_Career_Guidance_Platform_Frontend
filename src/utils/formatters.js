// src/utils/formatters.js
export function interpretGap(gap, language = "en") {
  // gap = required - you
  if (gap <= -1) {
    return { label: language === "mr" ? "उत्कृष्ट" : "Strong", colorClass: "text-green-700", icon: "bi-check-circle" };
  }
  if (gap >= 2) {
    return { label: language === "mr" ? "सुधार आवश्यक" : "Needs Improvement", colorClass: "text-red-600", icon: "bi-x-circle" };
  }
  return { label: language === "mr" ? "मध्यम" : "Moderate", colorClass: "text-yellow-600", icon: "bi-dash-circle" };
}
