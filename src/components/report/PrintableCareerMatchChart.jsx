// src/components/report/PrintableCareerMatchChart.jsx
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

/* ------------------ CLUSTER ICON MAP ------------------ */
const CLUSTER_ICON_MAP = {
  C01: "bi-gear-wide-connected",
  C02: "bi-flower1",
  C03: "bi-palette",
  C04: "bi-building",
  C05: "bi-laptop",
  C06: "bi-book",
  C07: "bi-lightning-charge",
  C08: "bi-cash-coin",
  C09: "bi-heart-pulse",
  C10: "bi-compass",
  C11: "bi-briefcase",
  C12: "bi-megaphone",
  C13: "bi-shield-check",
  C14: "bi-truck",
  C15: "bi-cpu",
  C16: "bi-bank",
};

/* ------------------ FIT BADGE COMPONENT ------------------ */
function ClusterFitBadge({ tier = "Good Fit", rank = 1 }) {
  if (rank === 1) {
    return (
      <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full border bg-blue-100 text-blue-800 border-blue-300 shadow-2xs whitespace-nowrap">
        ★ Best Match
      </span>
    );
  }
  if (rank <= 3) {
    return (
      <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full border bg-emerald-100 text-emerald-800 border-emerald-300 shadow-2xs whitespace-nowrap">
        Strong Fit
      </span>
    );
  }
  if (rank <= 6) {
    return (
      <span className="text-[9.5px] font-bold px-2 py-0.5 rounded-full border bg-amber-100 text-amber-800 border-amber-300 shadow-2xs whitespace-nowrap">
        Good Fit
      </span>
    );
  }
  return (
    <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full border bg-slate-100 text-slate-600 border-slate-300 whitespace-nowrap">
      Exploring Fit
    </span>
  );
}

/* ------------------ MAIN COMPONENT ------------------ */
export default function PrintableCareerMatchChart({
  chartData = [],
  language = "en",
}) {
  if (!chartData || !chartData.length) {
    return (
      <div className="text-gray-500 text-center py-6">
        {language === "mr" ? "डेटा उपलब्ध नाही" : "No data available"}
      </div>
    );
  }

  // Ensure all 16 clusters are captured
  const clusters = chartData.slice(0, 16);
  const userHollandTop3 = clusters[0]?.userHollandTop3 || "I-C-R";

  return (
    <div
      className="print-page font-sans text-gray-800"
      style={{
        width: "210mm",
        height: "297mm",
        maxHeight: "297mm",
        boxSizing: "border-box",
        padding: "7mm 10mm",
        background: "#ffffff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pageBreakAfter: "always",
        breakAfter: "page",
        pageBreakInside: "avoid",
        breakInside: "avoid",
      }}
    >
      {/* ================= HEADER SECTION ================= */}
      <div>
        {/* Title Bar */}
        <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 shadow-2xs"
              style={{
                backgroundColor: "#eff6ff",
                borderColor: "#bfdbfe",
                color: "#1e3a8a",
              }}
            >
              <i className="bi bi-grid-3x3-gap-fill text-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {language === "mr" ? "समूह संरेखन" : "Cluster Alignment"}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  {language === "mr" ? "सर्व १६ समूह" : "All 16 Career Clusters"}
                </span>
              </div>
              <h2 className="text-xl font-bold leading-tight" style={{ color: "#1e3a8a" }}>
                {language === "mr" ? "करिअर समूह स्कोअरकार्ड" : "Career Clusters Scorecard"}
              </h2>
            </div>
          </div>

          {/* Student RIASEC Profile Tag */}
          <div className="text-right">
            <span className="text-[10px] text-gray-500 font-semibold block">
              {language === "mr" ? "तुमचा रुची कोड" : "Your Interest Code"}
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span className="text-xs font-black text-blue-900 tracking-wider">
                {userHollandTop3}
              </span>
            </div>
          </div>
        </div>

        {/* Subtitle & Tier Legend */}
        <div className="flex items-center justify-between mt-1.5 mb-2 px-1">
          <p className="text-[10.5px] text-gray-600 max-w-md leading-relaxed">
            {language === "mr"
              ? "तुमच्या RIASEC रुची आणि बौद्धिक क्षमतेवर आधारित सर्व १६ करिअर समूहांचे वस्तुनिष्ठ मूल्यांकन."
              : "Objective alignment across all 16 career clusters ranked by your RIASEC personality match & cognitive aptitudes."}
          </p>

          {/* Legend Badges */}
          <div className="flex items-center gap-1.5 text-[9.5px] font-semibold shrink-0">
            <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
              ● Best Match (#1)
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              ● Strong (#2–#3)
            </span>
            <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
              ● Good (#4–#6)
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              ● Exploring (#7–#16)
            </span>
          </div>
        </div>

        {/* ================= 16 CLUSTER GRID (2 COLS x 8 ROWS, NO CHARTS) ================= */}
        <div className="grid grid-cols-2 gap-x-2.5 gap-y-1.5">
          {clusters.map((item, idx) => {
            const rank = item.rank || idx + 1;
            const isRank1 = rank === 1;
            const isStrong = rank > 1 && rank <= 3;
            const isGood = rank > 3 && rank <= 6;
            const clusterIcon = CLUSTER_ICON_MAP[item.clusterId] || item.icon || "bi-briefcase";

            // Extract career titles
            const careerTitles = (item.careers || [])
              .map((c) => (typeof c === "string" ? c : c.title))
              .filter(Boolean);

            return (
              <div
                key={item.clusterId || idx}
                className={`rounded-xl border p-2 flex flex-col justify-between transition-all ${
                  isRank1
                    ? "bg-gradient-to-r from-blue-50/90 to-indigo-50/60 border-blue-400 ring-1 ring-blue-300/70 shadow-2xs"
                    : isStrong
                    ? "bg-emerald-50/25 border-emerald-200"
                    : isGood
                    ? "bg-blue-50/15 border-blue-200"
                    : "bg-white border-slate-200"
                }`}
                style={{
                  height: "29.2mm",
                  boxSizing: "border-box",
                  pageBreakInside: "avoid",
                  breakInside: "avoid",
                }}
              >
                {/* -------- TOP ROW: Rank + Icon + Name + Tier Badge -------- */}
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {/* Rank Badge */}
                    <span
                      className={`text-[9.5px] font-black px-1.5 py-0.5 rounded-md shrink-0 shadow-2xs ${
                        isRank1
                          ? "bg-[#1e3a8a] text-white"
                          : isStrong
                          ? "bg-emerald-700 text-white"
                          : isGood
                          ? "bg-blue-700 text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      #{rank < 10 ? `0${rank}` : rank}
                    </span>

                    {/* Cluster Icon */}
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-[11px] ${
                        isRank1
                          ? "bg-blue-200/70 text-[#1e3a8a]"
                          : isStrong
                          ? "bg-emerald-100 text-emerald-800"
                          : isGood
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <i className={`bi ${clusterIcon}`} />
                    </div>

                    {/* Cluster Name */}
                    <h3
                      className="text-[10.5px] font-bold leading-tight truncate"
                      style={{ color: "#1e3a8a" }}
                      title={item.name || item.clusterName}
                    >
                      {item.name || item.clusterName}
                    </h3>
                  </div>

                  {/* Fit Tier Badge */}
                  <ClusterFitBadge tier={item.tier} rank={rank} />
                </div>

                {/* -------- MIDDLE ROW: Holland Code & Category -------- */}
                <div className="flex items-center justify-between text-[9px] px-0.5">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-slate-500">
                      {language === "mr" ? "हॉलंड कोड:" : "Holland:"}
                    </span>
                    <span className="font-bold text-slate-700 bg-slate-100 px-1 py-0.2 rounded border border-slate-200 tracking-wider">
                      {item.hollandCode || "—"}
                    </span>
                  </div>

                  <span className="text-slate-500 font-medium truncate max-w-[150px] text-right">
                    {item.onetPrimary && item.onetPrimary !== "—"
                      ? item.onetPrimary
                      : item.clusterId === "C15"
                      ? "Engineering & Technology"
                      : item.clusterId === "C16"
                      ? "Legal & Public Policy"
                      : `Cluster ${item.clusterId || rank}`}
                  </span>
                </div>

                {/* -------- BOTTOM ROW: Career Pathways Preview -------- */}
                <div className="pt-1 border-t border-slate-100 flex items-center gap-1 text-[9px] text-slate-600">
                  <i className="bi bi-briefcase text-blue-600 text-[9.5px] shrink-0" />
                  <span className="truncate">
                    {careerTitles.length > 0
                      ? careerTitles.slice(0, 3).join(" · ")
                      : "Explore emerging roles and pathways"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= FOOTER / GUIDANCE ================= */}
      <div className="pt-1 border-t border-gray-200 flex items-center justify-between text-[9.5px] text-gray-500">
        <div className="flex items-center gap-1.5">
          <i className="bi bi-info-circle-fill text-blue-600" />
          <span>
            {language === "mr"
              ? "प्रत्येक करिअर क्लस्टरची तपशीलवार १-पानाची सखोल माहिती पुढील पानांवर दिलेली आहे."
              : "Comprehensive single-page strategic deep-dives for each career cluster follow on subsequent pages."}
          </span>
        </div>
        <span className="font-semibold text-blue-900">
          MappMYUniversity Career Intelligence
        </span>
      </div>
    </div>
  );
}
