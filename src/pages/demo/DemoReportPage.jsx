// src/pages/demo/DemoReportPage.jsx
import React, { useState } from "react";

import PersonalityStrengths from "../../components/report/PersonalityStrengths";
import CareerInterests from "../../components/report/CareerInterests";

import {
    demoPersonalityScores,
    demoRiasecScores,
    demoAptitudeScores

} from "../../data/demoReportData";
import AptitudeStrengths from "../../components/report/AptitudeChart";
import DemoCareerOptions from "./DemoCareerOptions";

export default function DemoReportPage() {
    const [language, setLanguage] = useState("en");

    // Merge all scores, exactly like main report page does
    const allDemoScores = [
        ...demoPersonalityScores,
        ...demoRiasecScores,
        ...demoAptitudeScores,

    ];

    return (
        <div className="w-full min-h-screen pb-20">

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

            <div className="max-w-7xl mx-auto px-2">
                <h1 className="text-5xl font-semibold mb-8 text-gray-800">Demo User</h1>

                {/* 🔹 Personality Section */}
                <section className="mb-16">
                    <PersonalityStrengths
                        scores={allDemoScores}
                        language={language}
                    />
                </section>

                {/* 🔷 Career Interest Section */}
                <section className="mb-16">
                    <CareerInterests
                        scores={allDemoScores}
                        language={language}
                    />
                </section>

                {/* Aptitude */}
                <section className="mb-16">
                    <AptitudeStrengths scores={allDemoScores} language={language} />
                </section>

                <section className="mb-16">
                    <DemoCareerOptions language={language} />
                </section>

            </div>
        </div>
    );
}
