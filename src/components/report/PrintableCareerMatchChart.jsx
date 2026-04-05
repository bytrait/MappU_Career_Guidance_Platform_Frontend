import React from "react";
import careerImg from "../../assets/career.png";

/* ------------------ COLOR LOGIC ------------------ */
function getBarColor(value) {
  if (value >= 80) return "#2563eb"; // strong blue
  if (value >= 60) return "#3b82f6"; // medium blue
  if (value >= 40) return "#93c5fd"; // light blue
  return "#cbd5e1"; // muted
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
      className="w-full text-gray-800 print-page print:break-inside-avoid"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* ================= CONTENT ================= */}
      <div style={{ flex: 1 }}>
        {/* ================= HEADER ================= */}
        <div className="text-center mb-2">
          <div className="flex justify-center items-center gap-3 mb-1">
            <i className="bi bi-bullseye text-4xl text-primary" />
            <h2 className="text-4xl font-bold text-primary">
              {language === "mr" ? "करिअर समूह" : "Career Clusters"}
            </h2>
          </div>

          <p className="text-sm text-muted max-w-xl mx-auto">
            {language === "mr"
              ? "हे करिअर क्लस्टर्स तुमच्या व्यक्तिमत्वाच्या ताकदी आणि करिअर आवडींशी किती जुळतात यावर आधारित क्रमवारी लावलेले आहेत."
              : "These careers clusters are ranked based on how well they suit your personality strengths and career interest."}
          </p>

          <div className="mt-2 h-px bg-gray-200" />
        </div>

        <img src={careerImg} alt="Career" className="mx-auto h-[300px]" />

        {/* ================= BAR LIST ================= */}
        <div className="space-y-2">
          {chartData.slice(0, 10).map((item, idx) => {
            const color = getBarColor(item.value);

            return (
              <div
                key={idx}
                className="py-1"
                style={{ pageBreakInside: "avoid" }}
              >
                {/* -------- TOP ROW -------- */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {item.icon && (
                      <i
                        className={`bi ${item.icon} text-2xl text-primary`}
                        // style={{ color: "#2563eb" }}
                      />
                    )}
                    <span className="font-semibold text-primary text-base">
                      {item.name}
                    </span>
                  </div>

                  <span
                    className="text-sm text-primary font-bold"
                    // style={{ color }}
                  >
                    {item.value}%
                  </span>
                </div>

                {/* -------- BAR -------- */}
                <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    style={{
                      width: `${item.value}%`,
                      height: "100%",
                      // backgroundColor: color,
                      borderRadius: "999px",
                    }}
                    className="bg-accent"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= FOOTER (PAGE 04) ================= */}
      <div
        style={{
          marginTop: "auto",
          textAlign: "center",
          fontSize: "12px",
          color: "#6b7280",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#d1d5db",
            margin: "0 auto 6px",
          }}
        />
        4
      </div>
    </div>
  );
}
