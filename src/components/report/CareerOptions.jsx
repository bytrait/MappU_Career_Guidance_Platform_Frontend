import React from "react";
import careerFields from "../../data/career_fields.json";
import Spinner from "../common/Spinner";
import CareerMatchChart from "./CareerMatchChart";

export default function CareerOptions({
  scores = [],
  careers = [],
  economicStatus,
  language,
  readOnly = false,
  onSelectCareer = () => { },
}) {

  console.log(careers)

  /* ------------------ PREPARE CHART DATA ------------------ */
  const prepareChartData = () => {
    if (!scores?.length || !careers?.length || !careerFields?.length) {
      return [];
    }

    /**
     * Step 1: Build user RIASEC vector
     */
    const userScoresObj = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0,
    };

    for (const item of scores) {
      if (
        item.assessmentType === "RIASEC" &&
        ["R", "I", "A", "S", "E", "C"].includes(item.traitOrCategoryCode)
      ) {
        userScoresObj[item.traitOrCategoryCode] = Number(item.score) || 0;
      }
    }

    /**
     * Step 2: Extract unique category IDs
     */
    const categoryIds = Array.from(
      new Set(
        careers
          .map((c) => c.category_id)
          .filter((id) => id !== null && id !== undefined)
      )
    );

    /**
     * Step 3: Compute similarity per category
     */
    const results = categoryIds
      .map((id) => {
        const field = careerFields.find((f) => f.category_id === id);
        if (!field || !field.scores) return null;

        const similarity = cosineSimilarity(
          userScoresObj,
          field.scores
        );

        return {
          category_id: id,
          name:
            language === "mr"
              ? field.careerField?.mr
              : field.careerField?.en,
          value: Math.round(similarity * 100), // percentage
        };
      })
      .filter((item) => Boolean(item))
      .sort((a, b) => b.value - a.value);

    return results;
  };

  /**
   * Cosine similarity between user vector and ideal vector
   */
  function cosineSimilarity(user, ideal) {
    let dot = 0;
    let userMag = 0;
    let idealMag = 0;

    for (const key of ["R", "I", "A", "S", "E", "C"]) {
      const u = user[key] ?? 0;
      const i = ideal[key] ?? 0;

      dot += u * i;
      userMag += u * u;
      idealMag += i * i;
    }

    if (userMag === 0 || idealMag === 0) return 0;

    return dot / (Math.sqrt(userMag) * Math.sqrt(idealMag));
  }

  const chartData = prepareChartData();
  const categoryPriority = new Map();

  chartData.forEach((item, index) => {
    categoryPriority.set(item.category_id, index);
  });

  const orderedCareers = [...careers].sort((a, b) => {
  const priorityA = categoryPriority.get(a.category_id);
  const priorityB = categoryPriority.get(b.category_id);

  // Case 1: both categories exist in chart
  if (priorityA !== undefined && priorityB !== undefined) {
    if (priorityA !== priorityB) {
      return priorityA - priorityB; // category order
    }

    // Same category → sort by similarity (high to low)
    return (b.similarity || 0) - (a.similarity || 0);
  }

  // Case 2: one missing category → push missing to bottom
  if (priorityA === undefined) return 1;
  if (priorityB === undefined) return -1;

  return 0;
});

  /* ------------------ EMPTY STATE ------------------ */
  if (!scores.length) {
    return (
      <div className="w-full flex justify-center py-12">
        <Spinner />
      </div>
    );
  }
  /* ------------------ RENDER ------------------ */
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="max-w-7xl w-full text-center">
        <h2 className="text-2xl font-bold text-primary">
          {language === "mr" ? "करिअर पर्याय" : "Career Options"}
        </h2>
        <p className="text-muted mt-2">
          {language === "mr"
            ? "तुमच्या प्रोफाइल आणि आवडींवर आधारित, तुमच्यासाठी शिफारस केलेले करिअर मार्ग येथे आहेत."
            : "Based on your profile and preferences, here are the career paths recommended for you."}
        </p>
      </div>

      {/* Chart */}
      {chartData.length > 0 ? (
        <div className="w-full max-w-7xl mt-10">
          <CareerMatchChart
            chartData={chartData}
            language={language}
          />
        </div>
      ) : (
        <div className="w-full text-center py-12 text-gray-500">
          {language === "mr"
            ? "कोणत्याही करिअर शिफारसी आढळल्या नाहीत"
            : "No career recommendations found"}
        </div>
      )}

      {/* Career Cards */}
      {careers.length > 0 && (
        <div className="max-w-7xl w-full mt-10 space-y-10">
          {/* Professional */}
          {careers.some(c => c.career_type === "professional") && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                {language === "mr"
                  ? "व्यावसायिक करिअर"
                  : "Recommended Professional Careers"}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
                {orderedCareers
                  .filter(c => c.career_type === "professional")
                  .map(career => (
                    <CareerCard
                      key={career.id}
                      career={career}
                      language={language}
                      readOnly={readOnly}
                      onSelectCareer={onSelectCareer}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Vocational */}
          {careers.some(c => c.career_type === "vocational") && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                {language === "mr"
                  ? "व्यावसायिक प्रशिक्षण करिअर"
                  : "Recommended Vocational Careers"}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
                {orderedCareers
                  .filter(c => c.career_type === "vocational")
                  .map(career => (
                    <CareerCard
                      key={career.id}
                      career={career}
                      language={language}
                      readOnly={readOnly}
                      onSelectCareer={onSelectCareer}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------ CARD ------------------ */
function CareerCard({ career, language, readOnly, onSelectCareer }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between transition">
      <h3 className="text-xl font-semibold text-primary mb-3">
        {career.title?.value}
      </h3>

      <p className="text-muted text-sm mb-5 line-clamp-3">
        {career.description?.value}
      </p>

      <div className="flex items-center justify-between mt-auto">
        {!readOnly && (
          <button
            onClick={() => {
              onSelectCareer(career);
              window.open(`/career/${career.id}`, "_blank");
            }}
            className="bg-accent text-white px-4 py-2 rounded-lg text-sm hover:bg-success cursor-pointer transition font-medium"
          >
            {language === "mr" ? "मार्ग पहा" : "Show Path"}
          </button>
        )}

        <span className="bg-surface text-primary  px-3 py-1 rounded-full text-sm font-semibold">
          {career.similarity}%{" "}
          {language === "mr" ? "जुळणारे" : "match"}
        </span>
      </div>
    </div>
  );
}
