// src/components/report/PrintableCareerClusterDetail.jsx
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

/* ---------------- APTITUDE ICONS ---------------- */
const APTITUDE_ICONS = {
  LOG: "bi-puzzle",
  NUM: "bi-calculator",
  READ: "bi-book",
  MECH: "bi-gear",
  SPA: "bi-bounding-box",
};

/* ---------------- CAREER ICONS ---------------- */
const CAREER_ICONS = [
  "bi-code-slash",
  "bi-bar-chart-line",
  "bi-cpu",
  "bi-shield-check",
  "bi-wrench",
  "bi-cloud",
  "bi-gear-wide",
  "bi-briefcase",
];

/* ---------------- HELPER: DOT RATING ---------------- */
function RatingDots({ count = 3, max = 4, color = "#2563eb" }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full inline-block"
          style={{
            backgroundColor: i < count ? color : "#cbd5e1",
            borderRadius: "9999px",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- HELPER: AI OUTLOOK BADGE ---------------- */
function AiOutlookBadge({ outlook = "Growing" }) {
  const isGrowing = outlook.toLowerCase().includes("grow");
  const isChanging = outlook.toLowerCase().includes("chang");

  let bg = "#eff6ff";
  let text = "#1d4ed8";
  let border = "#bfdbfe";

  if (isChanging) {
    bg = "#fffbeb";
    text = "#b45309";
    border = "#fde68a";
  } else if (!isGrowing) {
    bg = "#fef2f2";
    text = "#b91c1c";
    border = "#fecaca";
  }

  return (
    <span
      className="text-[9px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap"
      style={{
        backgroundColor: bg,
        color: text,
        borderColor: border,
        borderRadius: "9999px",
      }}
    >
      AI: {outlook}
    </span>
  );
}

/* ---------------- HELPER: ROUTE FIT BADGE ---------------- */
function RouteFitBadge({ label = "Ready now" }) {
  const isReady = label.toLowerCase().includes("ready");
  const isGood = label.toLowerCase().includes("good");
  const isEnglish = label.toLowerCase().includes("english") || label.toLowerCase().includes("build");

  let bg = "#ecfdf5";
  let text = "#047857";
  let border = "#a7f3d0";

  if (isGood) {
    bg = "#eff6ff";
    text = "#1d4ed8";
    border = "#bfdbfe";
  } else if (isEnglish) {
    bg = "#fffbeb";
    text = "#b45309";
    border = "#fde68a";
  } else if (!isReady) {
    bg = "#fff7ed";
    text = "#c2410c";
    border = "#fed7aa";
  }

  return (
    <span
      className="text-[9px] font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap inline-block text-center shadow-2xs"
      style={{
        backgroundColor: bg,
        color: text,
        borderColor: border,
        borderRadius: "9999px",
      }}
    >
      {label}
    </span>
  );
}

/* ---------------- MAIN CLUSTER A4 PAGE COMPONENT ---------------- */

export default function PrintableCareerClusterDetail({
  cluster,
  userAptitudes = {},
  language = "en",
}) {
  if (!cluster) return null;

  const {
    clusterId,
    name,
    description,
    hollandCode,
    futureBottomLine,
    parentNote,
    careers = [],
    aptitudeNeeds = [],
    futureDemand = { growing: [], changing: [], shrinking: [] },
    aiImpact = { aiWillDoMoreOf: [], peopleWillStillDo: [] },
    prepare = [],
    studyRoutes = [],
    rank = 1,
    tier = "Good Fit",
    userHollandTop3 = "I-C-R",
  } = cluster;

  return (
    <div
      className="print-page font-sans text-gray-900"
      style={{
        width: "210mm",
        height: "297mm",
        maxHeight: "297mm",
        boxSizing: "border-box",
        padding: "6mm 10mm",
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
      {/* ================= 1. HEADER BANNER ================= */}
      <div className="pb-1.5 border-b border-gray-200">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 shadow-2xs"
              style={{
                backgroundColor: "#eff6ff",
                borderColor: "#bfdbfe",
                color: "#2563eb",
                borderRadius: "14px",
              }}
            >
              <i className={`bi ${cluster.icon || "bi-laptop"} text-2xl`} />
            </div>
            <div>
              <p className="text-[9.5px] font-extrabold tracking-wider uppercase text-blue-600">
                CAREER CLUSTER
              </p>
              <h1 className="text-xl font-extrabold text-[#1e3a8a] leading-tight tracking-tight">
                {name}
              </h1>
              <p className="text-[10.5px] text-gray-600 font-medium mt-0.5">
                {description}
              </p>
            </div>
          </div>

          {/* CLUSTER FIT & RANK CARD */}
          <div
            className="rounded-2xl p-2 border shrink-0 max-w-[220px] shadow-2xs"
            style={{
              backgroundColor: rank === 1 ? "#eff6ff" : "#f8fafc",
              borderColor: rank === 1 ? "#bfdbfe" : "#e2e8f0",
              borderRadius: "14px",
            }}
          >
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <p className="text-[9px] font-extrabold uppercase tracking-wide text-[#1e3a8a] flex items-center gap-1">
                <i className="bi bi-bullseye text-blue-600" />
                {language === "mr" ? "क्लस्टर पात्रता" : "CLUSTER FIT"}
              </p>
              <span
                className={`text-[8.5px] font-bold px-1.5 py-0.2 rounded-full border whitespace-nowrap ${
                  rank === 1
                    ? "bg-blue-100 text-blue-800 border-blue-200"
                    : rank <= 3
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : rank <= 6
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                #{rank < 10 ? `0${rank}` : rank} · {tier || (rank === 1 ? "Best Match" : rank <= 3 ? "Strong Fit" : rank <= 6 ? "Good Fit" : "Exploring Fit")}
              </span>
            </div>
            <p className="text-[9px] text-gray-600 leading-snug">
              {rank === 1 ? (
                <>
                  {language === "mr"
                    ? "तुमचा #१ उत्कृष्ट जुळणारा समूह, तुमच्या रुची कोडशी सर्वाधिक सुसंगत: "
                    : "Your #1 top match, highest compatibility with interest code "}
                  <strong className="text-blue-900 font-bold">{userHollandTop3 || hollandCode}</strong>.
                </>
              ) : rank <= 3 ? (
                <>
                  {language === "mr"
                    ? `क्रमवारी #${rank} (मजबूत जुळणी), तुमच्या रुची कोडशी सुसंगत: `
                    : `Rank #${rank} (Strong Fit), high compatibility with interest code `}
                  <strong className="text-blue-900 font-bold">{userHollandTop3 || hollandCode}</strong>.
                </>
              ) : rank <= 6 ? (
                <>
                  {language === "mr"
                    ? `क्रमवारी #${rank} (चांगली जुळणी), पर्यायी करिअर दिशा (कोड: `
                    : `Rank #${rank} (Good Fit), secondary career pathway (code `}
                  <strong className="text-blue-900 font-bold">{userHollandTop3 || hollandCode}</strong>
                  {language === "mr" ? ")." : ")."}
                </>
              ) : (
                <>
                  {language === "mr"
                    ? `क्रमवारी #${rank} (शोधण्यायोग्य), सर्व १६ समूहांच्या सर्वसमावेशक विश्लेषणाचा भाग.`
                    : `Rank #${rank} (Exploring Fit), included for comprehensive discovery across all 16 clusters.`}
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ================= 2. CAREERS YOU CAN EXPLORE (WRAPPED CARD) ================= */}
      <div
        className="border border-gray-200/90 rounded-2xl p-2.5 bg-white shadow-2xs"
        style={{ borderRadius: "16px" }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1e3a8a]">
            <div
              className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]"
              style={{ borderRadius: "9999px" }}
            >
              <i className="bi bi-briefcase-fill" />
            </div>
            <span>Careers you can explore</span>
          </div>
          <span className="text-[9.5px] text-gray-500 font-medium">
            Label shows how AI is changing each job
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {careers.slice(0, 6).map((career, idx) => {
            const icon = CAREER_ICONS[idx % CAREER_ICONS.length];
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200/90 rounded-xl p-2 shadow-2xs flex flex-col justify-between"
                style={{ borderRadius: "12px", minHeight: "64px" }}
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <i className={`bi ${icon} text-blue-600 text-xs`} />
                    <h4 className="text-[11px] font-bold text-slate-900 truncate">
                      {career.title}
                    </h4>
                  </div>
                  <p className="text-[9.5px] text-gray-600 line-clamp-1 font-medium">
                    {career.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-1 mt-1 pt-1 border-t border-gray-100">
                  <span className="text-[9px] text-gray-500 font-medium truncate">
                    {career.studyRoutesShort}
                  </span>
                  <AiOutlookBadge outlook={career.aiOutlook} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= 3. SKILLS THIS CLUSTER NEEDS (WRAPPED CARD) ================= */}
      <div
        className="border border-gray-200/90 rounded-2xl p-2.5 bg-white shadow-2xs"
        style={{ borderRadius: "16px" }}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1e3a8a]">
            <div
              className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]"
              style={{ borderRadius: "9999px" }}
            >
              <i className="bi bi-activity" />
            </div>
            <span>Skills this cluster needs — and your plan</span>
          </div>
          <span className="text-[9.5px] text-gray-500 font-medium">
            Your levels come from the aptitude check
          </span>
        </div>

        {/* Clean table headers matching design */}
        <div className="grid grid-cols-12 px-2 py-0.5 font-bold text-gray-500 text-[9px] mb-0.5">
          <div className="col-span-3">Aptitude</div>
          <div className="col-span-2 text-center">Needed</div>
          <div className="col-span-2 text-center">You</div>
          <div className="col-span-5">What to do</div>
        </div>

        <div className="space-y-0.5 text-[9.5px]">
          {aptitudeNeeds.slice(0, 5).map((item, idx) => {
            const userApt = userAptitudes[item.code] || {
              level: "Good",
              num: 3,
              text: "Good",
            };
            const neededScore = item.neededScore || 3;
            const userScore = userApt.num || 3;
            const isStrong = userScore >= neededScore;

            const actionText = item.focusAction || "Keep practicing core problems.";
            const statusPrefix = isStrong ? "On track." : "Focus here.";

            return (
              <div
                key={idx}
                className={`grid grid-cols-12 items-center px-2 py-1 rounded-xl transition-colors ${
                  isStrong
                    ? "border-b border-gray-100 last:border-b-0 bg-white"
                    : "bg-amber-50/70 border border-amber-200/80 shadow-2xs"
                }`}
                style={{ borderRadius: "10px" }}
              >
                <div className="col-span-3 font-semibold text-slate-800 flex items-center gap-1.5 truncate">
                  <i
                    className={`bi ${APTITUDE_ICONS[item.code] || "bi-star"} text-blue-600 text-xs`}
                  />
                  <span>{item.name}</span>
                </div>

                <div className="col-span-2 flex items-center justify-center gap-1.5">
                  <RatingDots count={neededScore} color="#334155" />
                  <span className="text-[9.5px] font-semibold text-gray-700">
                    {item.neededLevel}+
                  </span>
                </div>

                <div className="col-span-2 flex items-center justify-center gap-1.5">
                  <RatingDots
                    count={userScore}
                    color={isStrong ? "#2563eb" : "#d97706"}
                  />
                  <span
                    className="text-[9.5px] font-semibold"
                    style={{ color: isStrong ? "#1d4ed8" : "#d97706" }}
                  >
                    {userApt.text || userApt.level}
                  </span>
                </div>

                <div className="col-span-5 text-[9.5px] text-gray-700 leading-tight">
                  <strong
                    className="font-bold mr-1"
                    style={{ color: isStrong ? "#1d4ed8" : "#b45309" }}
                  >
                    {statusPrefix}
                  </strong>
                  {actionText}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= 4. FUTURE DEMAND & AI IMPACT (WRAPPED CARDS, EXPANDED 7-COL) ================= */}
      <div className="grid grid-cols-12 gap-2">
        {/* Left: Future Demand (col-span-7) */}
        <div
          className="col-span-7 border border-gray-200/90 rounded-2xl p-2.5 bg-white shadow-2xs flex flex-col justify-between"
          style={{ borderRadius: "16px" }}
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1e3a8a] mb-1">
              <div
                className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[9px]"
                style={{ borderRadius: "9999px" }}
              >
                <i className="bi bi-graph-up-arrow" />
              </div>
              <span>Future demand · next 5–10 years</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-[9px] mb-1.5">
              {/* Growing */}
              <div
                className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-1.5"
                style={{ borderRadius: "12px" }}
              >
                <p className="font-bold text-emerald-800 text-[9px] mb-0.5">
                  ↑ Growing
                </p>
                <ul className="space-y-0.5 text-gray-700 font-medium">
                  {futureDemand.growing.slice(0, 3).map((g, i) => (
                    <li key={i} className="leading-tight break-words">• {g}</li>
                  ))}
                </ul>
              </div>

              {/* Changing */}
              <div
                className="bg-amber-50/70 border border-amber-100 rounded-xl p-1.5"
                style={{ borderRadius: "12px" }}
              >
                <p className="font-bold text-amber-800 text-[9px] mb-0.5">
                  ⇄ Changing
                </p>
                <ul className="space-y-0.5 text-gray-700 font-medium">
                  {futureDemand.changing.slice(0, 3).map((c, i) => (
                    <li key={i} className="leading-tight break-words">• {c}</li>
                  ))}
                </ul>
              </div>

              {/* Shrinking */}
              <div
                className="bg-rose-50/70 border border-rose-100 rounded-xl p-1.5"
                style={{ borderRadius: "12px" }}
              >
                <p className="font-bold text-rose-800 text-[9px] mb-0.5">
                  ↓ Shrinking
                </p>
                <ul className="space-y-0.5 text-gray-700 font-medium">
                  {futureDemand.shrinking.slice(0, 3).map((s, i) => (
                    <li key={i} className="leading-tight break-words">• {s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            className="bg-slate-50 border border-slate-200/80 rounded-xl p-1.5 text-[9px] text-gray-700 leading-tight"
            style={{ borderRadius: "10px" }}
          >
            <strong className="text-[#1e3a8a] font-bold">Bottom line: </strong>
            {futureBottomLine}
          </div>
        </div>

        {/* Right: How AI changes this work (col-span-5) */}
        <div
          className="col-span-5 border border-gray-200/90 rounded-2xl p-2.5 bg-white shadow-2xs flex flex-col justify-between"
          style={{ borderRadius: "16px" }}
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1e3a8a] mb-1">
              <div
                className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[9px]"
                style={{ borderRadius: "9999px" }}
              >
                <i className="bi bi-cpu" />
              </div>
              <span>How AI changes this work</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[9px]">
              <div>
                <p className="font-bold text-slate-800 text-[9px] mb-1 flex items-center gap-1">
                  <i className="bi bi-robot text-amber-600" /> AI will do more
                </p>
                <ul className="space-y-0.5 text-gray-700">
                  {aiImpact.aiWillDoMoreOf.slice(0, 3).map((item, i) => (
                    <li key={i} className="leading-tight flex items-start gap-1">
                      <span className="text-amber-600 font-bold">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-bold text-slate-800 text-[9px] mb-1 flex items-center gap-1">
                  <i className="bi bi-person-check text-blue-600" /> People will do
                </p>
                <ul className="space-y-0.5 text-gray-700">
                  {aiImpact.peopleWillStillDo.slice(0, 3).map((item, i) => (
                    <li key={i} className="leading-tight flex items-start gap-1">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 5. HOW TO PREPARE (WRAPPED CARD) ================= */}
      <div
        className="border border-gray-200/90 rounded-2xl p-2.5 bg-white shadow-2xs"
        style={{ borderRadius: "16px" }}
      >
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1e3a8a] mb-2">
          <div
            className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]"
            style={{ borderRadius: "9999px" }}
          >
            <i className="bi bi-flag-fill" />
          </div>
          <span>How to prepare — step by step</span>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {prepare.slice(0, 4).map((step, idx) => (
            <div
              key={idx}
              className="border-t-[3px] border-[#1e3a8a] pt-1.5 text-[9.5px]"
            >
              <p className="font-bold text-[#1e3a8a] text-[9.5px] mb-0.5">
                {step.stage} · {step.stageLabel}
              </p>
              <p className="text-gray-700 leading-snug font-medium">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 6. STUDY ROUTES (WRAPPED CARD) ================= */}
      <div
        className="border border-gray-200/90 rounded-2xl p-2.5 bg-white shadow-2xs"
        style={{ borderRadius: "16px" }}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1e3a8a]">
            <div
              className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]"
              style={{ borderRadius: "9999px" }}
            >
              <i className="bi bi-mortarboard-fill" />
            </div>
            <span>Study routes</span>
          </div>
          <span className="text-[9.5px] text-gray-500 font-medium">
            "Your fit" is from your skills check
          </span>
        </div>

        <div className="text-[9.5px]">
          <div className="grid grid-cols-12 px-2 py-0.5 font-bold text-gray-500 text-[9px] mb-0.5">
            <div className="col-span-4">Route</div>
            <div className="col-span-2">Start after</div>
            <div className="col-span-1">Years</div>
            <div className="col-span-1">Cost</div>
            <div className="col-span-2">Leads to</div>
            <div className="col-span-2 text-center">Your fit</div>
          </div>

          <div className="space-y-0.5">
            {studyRoutes.slice(0, 5).map((route, idx) => {
              let fitLabel = "Ready now";
              if (idx === 2) fitLabel = "Good fit";
              if (idx === 3) fitLabel = "Build English";
              if (idx === 4) fitLabel = "2 gaps to close";

              return (
                <div
                  key={idx}
                  className="grid grid-cols-12 items-center px-2 py-1 font-medium text-gray-800 border-b border-gray-100 last:border-b-0"
                >
                  <div className="col-span-4 font-bold text-slate-900 leading-tight pr-1">
                    {route.route}
                  </div>
                  <div className="col-span-2 text-gray-600">
                    {route.startAfter}
                  </div>
                  <div className="col-span-1 text-gray-600">
                    {route.years}
                  </div>
                  <div className="col-span-1 text-gray-600">
                    {route.costLevel}
                  </div>
                  <div className="col-span-2 text-gray-700 leading-tight">
                    {route.leadsTo}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <RouteFitBadge label={fitLabel} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= 7. FOR PARENTS FOOTER ================= */}
      <div
        className="rounded-2xl px-3 py-1.5 border flex items-center gap-2.5 shadow-2xs"
        style={{
          backgroundColor: "#fffbeb",
          borderColor: "#fde68a",
          borderRadius: "14px",
        }}
      >
        <div
          className="w-5 h-5 rounded-full bg-amber-200/80 text-amber-800 flex items-center justify-center text-xs shrink-0 font-bold"
          style={{ borderRadius: "9999px" }}
        >
          <i className="bi bi-people-fill" />
        </div>
        <div className="text-[9.5px] text-amber-950 leading-tight">
          <strong className="font-bold text-amber-900">For parents: </strong>
          {parentNote}
        </div>
      </div>
    </div>
  );
}
