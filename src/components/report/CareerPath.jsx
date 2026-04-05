// src/components/CareerPath.jsx
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";

import styles from "../CareerContent/CareerContent.module.css";
import SegmentedContent from "../CareerContent/SegmentedContent";


export default function CareerPath({ selectedCareer, language = "en" }) {
  const [activeStep, setActiveStep] = useState(1);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (selectedCareer && selectedCareer.steps) {
      const mapped = selectedCareer.steps
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((s, idx) => ({
          id: s.order ?? idx + 1,
          title: (s.title && (s.title[language] || s.title.value)) || `Step ${s.order ?? idx + 1}`,
          description:
            (s.note && (s.note[language] || s.note.value)) || "",
          details: [],
        }));
      setSteps(mapped);
      setActiveStep(1);
    } else {
      setSteps([]);
      setActiveStep(1);
    }
  }, [selectedCareer, language]);

  const prev = () => setActiveStep((s) => Math.max(1, s - 1));
  const next = () => setActiveStep((s) => Math.min(steps.length, s + 1));

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className=" grid-cols-5 lg:grid-cols-2 lg:gap-8">
          {/* LEFT: timeline */}
          <div className="relative col-span-1 lg:col-span-1">
            <div className="block absolute top-4 bottom-4 w-1 bg-blue-100 left-10 lg:left-14" />
            <div className="space-y-6">
              {steps.length === 0 && (
                <div className="text-gray-500">Select a career to view steps.</div>
              )}
              {steps.map((step) => {
                const isActive = step.id === activeStep;
                return (
                  <div
                    key={step.id}
                    className="relative flex items-start lg:items-center gap-4 lg:gap-6"
                    onClick={() => setActiveStep(step.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setActiveStep(step.id);
                    }}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <div className="w-20 lg:w-28 flex justify-center">
                      <div className="relative flex items-center justify-center">
                        {/* Pin above circle */}
                        <span
                          className={`absolute -top-7 left-1/2 transform -translate-x-1/2 transition-opacity duration-200 z-20 ${
                            isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <FaMapMarkerAlt size={54} className="text-orange-500" />
                        </span>

                        {/* Number circle */}
                        <div
                          className={`relative flex items-center justify-center w-12 h-12 rounded-full ${
                            isActive
                              ? "bg-blue-400 text-white shadow-md"
                              : "bg-white border-2 border-blue-300 text-blue-600"
                          }`}
                        >
                          <span className="font-semibold">{step.id}</span>
                        </div>
                      </div>
                    </div>

                    {/* Step title (desktop only) */}
                    <div
                      className={`flex-1 transition p-4 rounded-lg cursor-pointer hidden lg:block ${
                        isActive
                          ? "bg-blue-50 border border-blue-200 shadow"
                          : "bg-white border border-transparent shadow-sm"
                      }`}
                    >
                      <h4
                        className={`font-semibold ${
                          isActive ? "text-blue-600" : "text-gray-800"
                        }`}
                      >
                        Step {step.id}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">{step.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 col-span-4 lg:col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {(selectedCareer?.title && (selectedCareer.title[language] || selectedCareer.title.value)) || "Career Path"}
                </h3>
                <p className="text-sm text-gray-600">
                  {(selectedCareer?.description &&
                    (selectedCareer.description[language] || selectedCareer.description.value)) ||
                    "Select a career to view its recommended steps and roadmap."}
                </p>
              </div>
            </div>

            {steps.length > 0 && (
              <>
                <div className="mb-4">
                  <div className="text-sm text-blue-600 font-semibold">STEP {activeStep}</div>
                  <h4 className="text-lg font-bold mt-2">
                    {steps[activeStep - 1]?.title || ""}
                  </h4>
                </div>

                {/* <div className={styles.contentContainer}
                dangerouslySetInnerHTML ={{ __html: steps[activeStep - 1]?.description || "" }}   
                /> */}
                <SegmentedContent html={steps[activeStep - 1]?.description || ""} />

                {/* Mobile prev/next */}
                <div className="mt-6 flex justify-center gap-4 lg:hidden">
                  <button
                    onClick={prev}
                    disabled={activeStep === 1}
                    className="p-2 rounded-full bg-blue-100 disabled:opacity-40"
                    aria-label="Previous"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    onClick={next}
                    disabled={activeStep === steps.length}
                    className="p-2 rounded-full bg-blue-100 disabled:opacity-40"
                    aria-label="Next"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
