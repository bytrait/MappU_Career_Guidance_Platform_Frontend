// src/components/PrintDocument.jsx
import React, { useMemo } from "react";
import PrintablePersonalityStrengths from "./PrintablePersonalityStrengths";
import PrintableCareerInterests from "./PrintableCareerInterests";
import PrintableAptitudeStrengths from "./PrintableAptitudeStrengths";
import PrintableEqProfile from "./PrintableEqProfile";
import PrintableLearningPreferences from "./PrintableLearningPreferences";
import PrintableCareerMatchChart from "./PrintableCareerMatchChart";
import PrintableCareerClusterDetail from "./PrintableCareerClusterDetail";

// --- OLD CAREER COMPONENTS (PRESERVED / COMMENTED OUT) ---
// import PrintableCareerOptions from "./PrintableCareerOptions";
// import PrintableCareerDetail from "./PrintableCareerDetail";
// import careerFields from "../../data/career_fields.json";

import { getRankedClusters } from "../../utils/clusterMatching.util";

export default function PrintDocument({
  scores = [],
  language = "en",
  userDetails = {},
  recommendedCareers = [],
  selectedCareerIds = [],
  selectedCareersHtml = "",
}) {
  // -------- RANKED CLUSTERS WITH HOLLAND MATCHING & FIT TIERS --------
  const rankedClusters = useMemo(() => {
    return getRankedClusters(scores);
  }, [scores]);

  // Career Cluster deep-dive pages (All 16 ranked clusters)
  const allClusters = rankedClusters;

  return (
    <div id="print-root">
      {/* 1. Personality Assessment (2 strict A4 pages) */}
      <PrintablePersonalityStrengths scores={scores} language={language} />

      {/* 2. Career Interests (2 strict A4 pages) */}
      <PrintableCareerInterests scores={scores} language={language} />

      {/* 3. Aptitude & Skills (2 strict A4 pages) */}
      <PrintableAptitudeStrengths scores={scores} language={language} />

      {/* 4. Emotional Intelligence (Commented out as per preference) */}
      {/* <PrintableEqProfile scores={scores} language={language} /> */}

      {/* 5. Learning Preferences (Commented out as per preference) */}
      {/* <PrintableLearningPreferences scores={scores} language={language} /> */}

      {/* 6. Career Clusters Summary Scorecard (All 16 Ranked Clusters) */}
      <PrintableCareerMatchChart
        chartData={rankedClusters}
        language={language}
      />

      {/* 7. Career Cluster Deep-Dive A4 Pages (All 16 Ranked Clusters) */}
      {allClusters.map((cluster) => (
        <PrintableCareerClusterDetail
          key={cluster.clusterId}
          cluster={cluster}
          userAptitudes={cluster.userAptitudes}
          language={language}
        />
      ))}

      {/* ========================================================================= */}
      {/* --- OLD CAREER CLUSTER OPTIONS & CAREER DETAILS (PRESERVED AS COMMENT) --- */}
      {/* ========================================================================= */}
      {/*
      <PrintableCareerOptions
        scores={scores}
        careers={orderedCareers}
        language={language}
      />

      {orderedCareers
        .filter((c) => selectedCareerIds.includes(c.id))
        .map((career) => (
          <div
            className="career-detail-wrapper"
            key={career.id}
            style={{
              pageBreakBefore: "always",
              breakBefore: "page",
              width: "210mm",
              boxSizing: "border-box",
              padding: "10mm 14mm",
              background: "#ffffff",
            }}
          >
            <PrintableCareerDetail
              key={career.id}
              career={career}
              language={language}
            />
          </div>
        ))}
      */}
    </div>
  );
}
