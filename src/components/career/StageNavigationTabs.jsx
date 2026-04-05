// src/components/career/StageNavigationTabs.jsx
import React, { useRef, useEffect, useState, useCallback } from "react";

const STAGE_ICONS = {
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



export default function StageNavigationTabs({
  steps = [],
  selectedIndex = 0,
  onSelect = () => { },
  language = "en",
}) {
  const containerRef = useRef(null);
  const [centers, setCenters] = useState([]);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  let scrollTimeout = useRef(null);
  const [isCentered, setIsCentered] = useState(false);


  // Measure center position of each stage circle
  const measureCenters = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const nodes = container.querySelectorAll(".stage-item");

    const newCenters = Array.from(nodes).map((el) => {
      const r = el.getBoundingClientRect();
      const centerX =
        (r.left + r.width / 2) - containerRect.left + container.scrollLeft;
      return Math.round(centerX);
    });

    setCenters(newCenters);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onUserScroll = () => {
      setIsUserScrolling(true);

      // reset previous timer
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      // user stopped scrolling for 300ms → allow auto scroll again
      scrollTimeout.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, 300);
    };

    container.addEventListener("scroll", onUserScroll);

    return () => {
      if (container) container.removeEventListener("scroll", onUserScroll);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalWidth = steps.length * 120 + 40; // each item 120px + padding
    const screenWidth = container.clientWidth;

    setIsCentered(totalWidth <= screenWidth);
  }, [steps.length, window.innerWidth]);


  useEffect(() => {
    measureCenters();
    window.addEventListener("resize", measureCenters);
    const c = containerRef.current;
    if (c) c.addEventListener("scroll", measureCenters);

    return () => {
      window.removeEventListener("resize", measureCenters);
      if (c) c.removeEventListener("scroll", measureCenters);
    };
  }, [measureCenters, steps.length]);

  useEffect(() => {
    const t = setTimeout(measureCenters, 30);
    return () => clearTimeout(t);
  }, [selectedIndex, steps.length, measureCenters]);

  const total = steps.length;
  const canDraw = centers.length === total && total > 0;

  const start = canDraw ? centers[0] : 0;
  const end = canDraw ? centers[total - 1] : 0;
  const fillWidth = canDraw ? Math.max(0, centers[selectedIndex] - start) : 0;

  // 🔥 Auto-scroll to keep active centered
  useEffect(() => {
    if (!containerRef.current || !canDraw) return;

    // ⛔ Do NOT auto scroll if user is manually scrolling
    if (isUserScrolling) return;

    const container = containerRef.current;
    const targetX = centers[selectedIndex] - container.clientWidth / 2;

    container.scrollTo({
      left: Math.max(0, targetX),
      behavior: "smooth",
    });
  }, [selectedIndex, centers, canDraw, isUserScrolling]);


  return (
    <div className="w-full bg-white sticky top-0 z-30 border-b border-gray-200 shadow-sm">
      <div
        ref={containerRef}
        className="relative overflow-x-auto scrollbar-hide py-6"
      >
        {/* Draw connector lines */}
        {canDraw && (
          <>
            <div
              className="absolute h-1 bg-gray-300 top-[55px] z-0"
              style={{
                left: start,
                width: Math.max(0, end - start),
              }}
            />
            <div
              className="absolute h-2 bg-blue-600 top-[55px] rounded-full z-10 transition-all duration-500"
              style={{
                left: start,
                width: fillWidth,
              }}
            />
          </>
        )}

        {/* Stage Items */}
        <div
          className={`
    flex items-center gap-5 px-10 relative z-20
    ${isCentered ? "justify-center w-full" : "min-w-max"}
  `}
        >          {steps.map((s, idx) => {
          const isActive = idx === selectedIndex;
          const isCompleted = idx < selectedIndex;
          const icon = STAGE_ICONS[s.title] || "bi bi-dot";

          return (
            <div
              key={idx}
              className="stage-item flex flex-col items-center"
              style={{
                width: 120,              // fixed width prevents shifting
                flexShrink: 0,           // prevents half-circles on small screens
              }}
            >
              {/* FIXED HEIGHT CIRCLE WRAPPER */}
              <div
                className="flex items-center justify-center"
                style={{
                  height: 70,            // ensures all circles are exactly aligned
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button onClick={() => onSelect(idx)}>
                  <div
                    className={`
          w-12 h-12 rounded-full border-2 flex items-center justify-center
          transition-all duration-300
          ${isActive
                        ? "border-blue-600 bg-white shadow-md scale-105"
                        : isCompleted
                          ? "border-blue-400 bg-white"
                          : "border-gray-400 bg-white"
                      }
        `}
                  >
                    <i
                      className={`${icon} text-lg ${isActive
                        ? "text-blue-700"
                        : isCompleted
                          ? "text-blue-600"
                          : "text-gray-500"
                        }`}
                    ></i>
                  </div>
                </button>
              </div>

              {/* LABEL - DOES NOT AFFECT CIRCLE POSITION */}
              <div
                style={{
                  minHeight: 40,         // ensure label height is fixed
                  paddingTop: 8,
                }}
              >
                <span
                  className={`text-xs text-center block leading-tight ${isActive ? "text-blue-700 font-semibold" : "text-gray-600"
                    }`}
                  style={{ width: "100%" }}
                >
                  {language === "mr" && s.title_mr ? s.title_mr : s.title}
                </span>
              </div>
            </div>

          );
        })}
        </div>
      </div>
    </div>
  );
}
