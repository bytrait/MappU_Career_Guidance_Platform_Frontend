import React from "react";
import careerImg from "../../assets/career.png";

/* ------------------ COLOR LOGIC ------------------ */
function getBarColor(value) {
  if (value >= 80) return "#2563eb"; // strong blue
  if (value >= 60) return "#3b82f6"; // medium blue
  if (value >= 40) return "#60a5fa"; // light blue
  return "#94a3b8"; // muted
}

/* ------------------ COMPONENT ------------------ */
export default function PrintableCareerMatchChart({
  chartData = [],
  language = "en",
}) {
  if (!chartData.length) {
    return (
      <div className="text-gray-500 text-center py-6">
        {language === "mr" ? "डेटा उपलब्ध नाही" : "No data available"}
      </div>
    );
  }

  return (
    <div
      className="print-page font-sans text-gray-800"
      style={{
        width: "210mm",
        height: "297mm",
        maxHeight: "297mm",
        boxSizing: "border-box",
        padding: "10mm 14mm",
        background: "#ffffff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pageBreakAfter: "always",
        breakAfter: "page",
      }}
    >
      {/* ================= CONTENT ================= */}
      <div>
        {/* ================= HEADER ================= */}
        <div className="text-center mb-2">
          <div className="flex justify-center items-center gap-3 mb-1">
            <i className="bi bi-bullseye text-3xl" style={{ color: "#2563eb" }} />
            <h2 className="text-3xl font-bold" style={{ color: "#1e3a8a" }}>
              {language === "mr" ? "करिअर समूह" : "Career Clusters"}
            </h2>
          </div>

          <p className="text-xs text-gray-500 max-w-xl mx-auto">
            {language === "mr"
              ? "हे करिअर क्लस्टर्स तुमच्या व्यक्तिमत्वाच्या ताकदी आणि करिअर आवडींशी किती जुळतात यावर आधारित क्रमवारी लावलेले आहेत."
              : "These career clusters are ranked based on how well they suit your personality strengths and career interest."}
          </p>

          <div className="mt-2 h-px bg-gray-200" />
        </div>

        {/* ================= IMAGE (FITTED BUDGET) ================= */}
        <div className="flex justify-center my-2">
          <img
            src={careerImg}
            alt="Career Clusters"
            className="h-[120px] object-contain"
          />
        </div>

        {/* ================= BAR LIST (10 ITEMS) ================= */}
        <div className="space-y-1.5">
          {chartData.slice(0, 10).map((item, idx) => {
            const color = getBarColor(item.value);

            return (
              <div
                key={idx}
                className="py-0.5"
                style={{ pageBreakInside: "avoid" }}
              >
                {/* -------- TOP ROW -------- */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <i
                      className={`bi ${item.icon || "bi-briefcase"} text-lg`}
                      style={{ color: "#2563eb" }}
                    />
                    <span className="font-semibold text-sm" style={{ color: "#1e3a8a" }}>
                      {item.name}
                    </span>
                  </div>

                  <span
                    className="text-xs font-bold"
                    style={{ color: "#1e3a8a" }}
                  >
                    {item.value}%
                  </span>
                </div>

                {/* -------- BAR -------- */}
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    style={{
                      width: `${item.value}%`,
                      height: "100%",
                      backgroundColor: "#2563eb",
                      borderRadius: "999px",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
