// src/components/career/CareerHero.jsx
import React from "react";
import { useSelector } from "react-redux";
import CareerFitSummary from "./CareerFitSummary";

// RIASEC label mapping
const RIASEC_LABELS = {
    R: "Realistic",
    I: "Investigative",
    A: "Artistic",
    S: "Social",
    E: "Enterprising",
    C: "Conventional",
};

// Match label helper
function getMatchLabel(score, language = "en") {
    if (score >= 75) return language === "mr" ? "उत्तम जुळणारे" : "Great Fit";
    if (score >= 45) return language === "mr" ? "मध्यम जुळणारे" : "Moderate Fit";
    return language === "mr" ? "कमी जुळणारे" : "Low Fit";
}

// Circular score ring
function CircularScore({ score, language }) {
    const radius = 40;
    const stroke = 8;
    const normalized = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalized;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-50 h-50">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle
                    cx="50"
                    cy="50"
                    r={normalized}
                    stroke="#e5e7eb"
                    strokeWidth={stroke}
                    fill="transparent"
                />
                <circle
                    cx="50"
                    cy="50"
                    r={normalized}
                    stroke="#2563eb"
                    strokeWidth={stroke}
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-700"
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-xl font-bold text-gray-900">{score}%</div>
                <div className="text-xs text-gray-600 text-center leading-tight">
                    {getMatchLabel(score, language)}
                </div>
            </div>
        </div>
    );
}

export default function CareerHero() {
    const { selectedCareer, language, scores } = useSelector((s) => s.report);

    if (!selectedCareer) return null;

    // Title
    const careerTitle =
        selectedCareer?.title?.[language] ||
        selectedCareer?.title?.value ||
        selectedCareer?.translations?.en?.title;

    const subtitle =
        selectedCareer?.description?.[language] ||
        selectedCareer?.description?.value ||
        "";

    // Match score
    const matchScore = Math.round(selectedCareer?.similarity || 0);
    const aptitude = selectedCareer?.aptitude || {};

    // Strength chips
    const strengths = selectedCareer?.strengths || [];

    // Cost & salary
    const minCost = selectedCareer?.cost?.min || "₹—";
    const maxCost = selectedCareer?.cost?.max || selectedCareer?.max_cost || "₹—";
    const avgSalary =
        selectedCareer?.avg_salary ? `₹${selectedCareer.avg_salary} LPA` : "₹—";


    // ---------------- RIASEC TOP TRAITS ----------------
    const riasecScores = selectedCareer?.riasec || {};

    const topRiasec = Object.entries(riasecScores)
        .sort((a, b) => b[1] - a[1]) // sort high to low
        .slice(0, 3)
        .map(([key, value]) => ({
            code: key,
            label: RIASEC_LABELS[key],
            score: value,
        }));

    return (
        <header className="relative py-10 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto relative">



                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* LEFT COLUMN */}
                    <div className="md:col-span-2">

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            {careerTitle}
                        </h1>

                        {/* Subtitle */}
                        {subtitle && (
                            <p className="text-gray-600 mt-2 max-w-3xl">{subtitle}</p>
                        )}

                        {/* Mobile Circular Score */}
                        <div className="flex justify-center mb-6 md:hidden">
                            <CircularScore score={matchScore} language={language} />
                        </div>

                        {/* Strengths */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {strengths.slice(0, 6).map((s, i) => (
                                <span
                                    key={i}
                                    className="bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 shadow-sm"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>

                        {/* ---- Top RIASEC Traits ---- */}
                        {topRiasec.length > 0 && (
                            <div className="mt-5">
                                <div className="flex flex-wrap gap-2">
                                    {topRiasec.map((t, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-sm"
                                        >
                                            {t.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Cost & Salary */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-start gap-3">
                                <i className="bi bi-cash-stack text-blue-600 text-2xl"></i>
                                <div>
                                    <div className="text-xs text-gray-500">
                                        {language === "mr" ? "किमान खर्च" : "Minimum Cost"}
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 mt-1">{minCost}</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-start gap-3">
                                <i className="bi bi-wallet2 text-blue-600 text-2xl"></i>
                                <div>
                                    <div className="text-xs text-gray-500">
                                        {language === "mr" ? "कमाल खर्च" : "Maximum Cost"}
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 mt-1">{maxCost}</div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-start gap-3">
                                <i className="bi bi-graph-up text-blue-600 text-2xl"></i>
                                <div>
                                    <div className="text-xs text-gray-500">
                                        {language === "mr" ? "सरासरी पगार" : "Average Salary"}
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 mt-1">{avgSalary}</div>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="items-center justify-center hidden md:flex">
                        <CircularScore score={matchScore} language={language} />

                    </div>

                </div>
                {/* Fit Summary (Mobile Only) */}
                <div className="mt-8">
                    <CareerFitSummary aptitude={aptitude} language={language} />
                </div>
                {/* Motivational Note */}
                <div className="mt-3 space-y-1">

                    {/* Main motivational message */}
                    <p className=" text-gray-600">
                        {language === "mr"
                            ? "लक्षात ठेवा, क्षमता गुण फक्त तुमची आजची पातळी दर्शवतात — तुम्ही काय बनू शकता ते नाही. सराव आणि सातत्याने कोणतेही कौशल्य विकसित करता येते. सुरुवात कुठून झाली यापेक्षा शिकण्याचा प्रवास महत्त्वाचा आहे."
                            : "Remember, aptitude scores only show where you are today — not what you can become. With practice and consistency, any skill can be improved. Your learning journey matters more than your starting point."
                        }
                    </p>

                </div>

            </div>
        </header>
    );
}
