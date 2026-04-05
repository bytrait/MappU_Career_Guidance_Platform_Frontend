import { cleanHtmlContent } from "../../utils/cleanHtmlContent";
import { segmentCareerHtml } from "../../utils/segmentCareerHtml";

/* ---------------- ICON MAP ---------------- */

const STEP_ICON_MAP = {
  /* ===============================
    🎓 PROFESSIONAL – CANONICAL
    =============================== */
  Overview: "bi bi-info-circle-fill",
  Education: "bi bi-mortarboard-fill",
  Exams: "bi bi-journal-check",
  Colleges: "bi bi-building",
  Skills: "bi bi-tools",
  Growth: "bi bi-graph-up-arrow",
  Future: "bi bi-lightbulb-fill",
  Summary: "bi bi-stars",

  /* ===============================
     🛠️ VOCATIONAL – CANONICAL
     =============================== */
  Eligibility: "bi bi-clipboard-check",
  Courses: "bi bi-award-fill",
  Tools: "bi bi-tools",
  Jobs: "bi bi-briefcase-fill",
  Earnings: "bi bi-cash-stack",

  /* ===============================
     🌐 MARATHI – PROFESSIONAL
     =============================== */
  "आढावा": "bi bi-info-circle-fill",
  "शिक्षण": "bi bi-mortarboard-fill",
  "प्रवेश परीक्षा": "bi bi-journal-check",
  "महाविद्यालये": "bi bi-building",
  "कौशल्ये": "bi bi-tools",
  "वाढ": "bi bi-graph-up-arrow",
  "भविष्य": "bi bi-lightbulb-fill",
  "सारांश": "bi bi-stars",

  /* ===============================
     🌐 MARATHI – VOCATIONAL
     =============================== */
  "पात्रता": "bi bi-clipboard-check",
  "कोर्सेस": "bi bi-award-fill",
  "साधने": "bi bi-tools",
  "नोकऱ्या": "bi bi-briefcase-fill",
  "उत्पन्न": "bi bi-cash-stack",
};

/* ---------------- COMPONENT ---------------- */

export default function PrintableCareerDetail({ career, language = "en" }) {
  if (!career) return null;

  const steps = [...(career.steps || [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  return (
    <div>
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          padding: 24,
        }}
      >
        {/* CAREER TITLE */}
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#1e3a8a",
            marginBottom: 24,
          }}
        >
          {career.title?.[language] || career.title?.value}
        </h1>

        {/* STEPS — BROWSER CONTROLS PAGINATION */}
        {steps.map((step, index) => {
          const rawHtml =
            typeof step.note === "string"
              ? step.note
              : step.note?.value || "";

          if (!rawHtml) return null;

          // const segmentedHtml = segmentCareerHtml(rawHtml);
          const icon = STEP_ICON_MAP[step.type] || "bi bi-dot";

          return (
            <div
              key={step.id}
              style={{
                marginBottom: index !== steps.length - 1 ? 32 : 0,
              }}
            >
              {/* STEP HEADER */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 22 }}>
                  Step {index + 1}
                </span>

                <div className="flex gap-2 items-center">
                  <i
                    className={icon}
                    style={{ color: "#2563eb", fontSize: 24 }}
                  />
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#1e293b",
                      fontSize: 22,
                    }}
                  >
                    {step.title?.[language] || step.title?.value}
                  </span>
                </div>
              </div>

              {/* STEP CONTENT */}
              <div
                className="career-content"
                dangerouslySetInnerHTML={{ __html: cleanHtmlContent(rawHtml) }}
              />

              {/* END-OF-STAGE LINE */}
              {index !== steps.length - 1 && (
                <div
                  style={{
                    height: 1.5,
                    backgroundColor: "#e5e7eb",
                    margin: "24px 0",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
