import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import { demoRecommendedCareers } from "../../data/demoCareerOptions";
// import { getDemoStepsForCareer } from "../../data/demoCareerSteps";
import { demoCareerBaseInfo } from "../../data/demoCareerBaseInfo";
import { demoCareerSteps } from "../../data/demoCareerSteps";

import DemoCareerHero from "./DemoCareerHero";
import StageNavigationTabs from "../../components/career/StageNavigationTabs";
import StageContentView from "../../components/career/StageContentView";

export default function DemoCareerPage() {
    const { careerId } = useParams();

    const [career, setCareer] = useState(null);
    const [steps, setSteps] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [language, setLanguage] = useState("en");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Convert object -> array
        const careersArray = Object.values(demoCareerBaseInfo);

        const found = careersArray.find((c) => c.id === careerId);
        setCareer(found || null);

        let stepList = demoCareerSteps[careerId];
        setSteps(stepList);

        setLoading(false);
    }, [careerId]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading career…
            </div>
        );
    }

    if (!career) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
                <div className="text-lg">Career not found.</div>

                <a href="/demo/report" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Go Back
                </a>
            </div>
        );
    }

    // STEP MAPPING (FIXED)
    const mappedSteps = steps.map((s) => ({
        order: s.order,
        title: s.title[language],
        title_mr: s.title.mr,
        content: s.content[language], // FIXED
    }));

    const selectedStep = mappedSteps[selectedIndex];

    return (
        <>
            {/* LANGUAGE SWITCH */}
            <div className="flex justify-end px-6 py-4">
                <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
                    <button
                        onClick={() => setLanguage("en")}
                        className={`px-3 py-1 rounded-full ${language === "en" ? "bg-blue-600 text-white" : ""}`}
                    >
                        English
                    </button>

                    <button
                        onClick={() => setLanguage("mr")}
                        className={`px-3 py-1 rounded-full ${language === "mr" ? "bg-blue-600 text-white" : ""}`}
                    >
                        मराठी
                    </button>
                </div>
            </div>

            {/* HERO SECTION */}
            <DemoCareerHero
                title={career.title[language]}
                subtitle={career.description[language]}
                matchScore={career.similarity}
                strengths={career.strengths}
                riasec={career.riasec}
                minCost={career.cost.min}
                maxCost={career.cost.max}
                avgSalary={career.avgSalary}
                aptitude={career.aptitude}
                language={language}
            />

            {/* TABS + CONTENT */}
            <div className="max-w-7xl mx-auto px-4 mt-10">
                <StageNavigationTabs
                    steps={mappedSteps}
                    selectedIndex={selectedIndex}
                    onSelect={setSelectedIndex}
                    language={language}
                />

                <StageContentView step={selectedStep} language={language} />
            </div>
        </>
    );
}
