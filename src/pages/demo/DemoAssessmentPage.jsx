// src/pages/DemoAssessmentPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "../../components/Assessment/ProgressBar";
import AssessmentQuestion from "../../components/Assessment/AssessmentQuestion";
import AptitudeQuestion from "../../components/Assessment/AptitudeQuestion";

import CompletionModal from "../../components/Assessment/CompletionModal";
import InterestInstructions from "./DemoInterestInstructions";
import RIASECCompletionModal from "../../components/Assessment/RIASECCompletionModal";
import AptitudeInstructions from "./DemoAptitudeInstructions";

import { getFromLocalStorage, saveToLocalStorage } from "../../utils/localStorage.util";

import { OCEAN, RIASEC, APTITUDE } from "../../data/demoQuestions";

import Spinner from "../../components/common/Spinner";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DemoOceanInstructions from "./DemoOceanInstructions";

export default function DemoAssessmentPage() {
  const navigate = useNavigate();

  // Flow states
  const [assessmentType, setAssessmentType] = useState("OCEAN"); // start at OCEAN directly
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);

  // answers stored in LS
  const [answers, setAnswers] = useState(
    getFromLocalStorage("demo_assessment_answers") || {}
  );

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // instruction & modal control
  const [showOceanInstructions, setShowOceanInstructions] = useState(true);
  const [showInterestInstructions, setShowInterestInstructions] = useState(false);
  const [showAptitudeInstructions, setShowAptitudeInstructions] = useState(false);

  const [showCompletionModal, setShowCompletionModal] = useState(false); // OCEAN → RIASEC
  const [showRiasecCompletionModal, setShowRiasecCompletionModal] = useState(false); // RIASEC → APTITUDE

  // ------------------------------------------------
  // Load questions when assessmentType changes
  // ------------------------------------------------
  useEffect(() => {
    let formatted = [];

    // --------------------------------------------
    // OCEAN → match main system
    // --------------------------------------------
    if (assessmentType === "OCEAN") {
      formatted = OCEAN.flatMap((trait) =>
        trait.questions.map((q, index) => ({
          id: `${trait.code}-${q.order}-${index}`, // unique id
          order: q.order,
          reverse: q.reverse,
          trait: {
            code: trait.code,
            name: trait.name,
          },
          text: {
            en: q.translations.find((t) => t.language === "en")?.text || "",
            mr: q.translations.find((t) => t.language === "mr")?.text || "",
          },
        }))
      );
    }

    // --------------------------------------------
    // RIASEC → match main system
    // --------------------------------------------
    else if (assessmentType === "RIASEC") {
      formatted = RIASEC.flatMap((trait) =>
        trait.questions.map((q, index) => ({
          id: `${trait.code}-${q.order}-${index}`,
          order: q.order,
          reverse: q.reverse,
          trait: {
            code: trait.code,
            name: trait.name,
          },
          text: {
            en: q.translations.find((t) => t.language === "en")?.text || "",
            mr: q.translations.find((t) => t.language === "mr")?.text || "",
          },
        }))
      );
    }

    // --------------------------------------------
    // APTITUDE → match AptitudeQuestion component format
    // --------------------------------------------
    else if (assessmentType === "APTITUDE") {
      formatted = APTITUDE.flatMap((category) =>
        category.questions.map((q, index) => ({
          id: `${category.code}-${q.order}-${index}`,
          order: q.order,
          reverse: false,
          trait: {
            code: category.code,
            name: category.name,
          },
          timeLimitSeconds: q.timeLimitSeconds || 60,
          text: {
            en: q.translations.find((t) => t.language === "en")?.text || "",
            mr: q.translations.find((t) => t.language === "mr")?.text || "",
          },
          options: q.options.map((opt, i) => ({
            id: `${category.code}-${q.order}-opt-${i}`,
            isCorrect: opt.isCorrect,
            text: {
              en: opt.translations.find((t) => t.language === "en")?.text || "",
              mr: opt.translations.find((t) => t.language === "mr")?.text || "",
            },
          })),
        }))
      );
    }

    formatted.sort((a, b) => a.order - b.order);
    setQuestions(formatted);
    setCurrent(0);
    setLoading(false);
  }, [assessmentType]);



  // -------------------------------------------
  // Answer handler
  // -------------------------------------------
  const handleAnswer = (questionId, value) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
    saveToLocalStorage("demo_assessment_answers", updated);
  };

  // -------------------------------------------
  // Normalization and scoring
  // -------------------------------------------
  const calculateScores = () => {
    if (assessmentType === "APTITUDE") {
      let scoreMap = {};

      for (const q of questions) {
        const selected = q.options.find((opt) => opt.id === answers[q.id]);
        const correct = selected?.isCorrect ? 1 : 0;

        scoreMap[q.trait.code] = (scoreMap[q.trait.code] || 0) + correct;
      }

      return Object.entries(scoreMap).map(([code, score]) => ({
        assessmentType,
        traitOrCategoryCode: code,
        score,
      }));
    }

    // OCEAN & RIASEC — Likert 1–5
    let scoreMap = {};
    let questionCount = {};

    for (const q of questions) {
      const val = answers[q.id];
      if (val == null) continue;

      const adjusted = q.reverse ? 6 - val : val;

      scoreMap[q.trait.code] = (scoreMap[q.trait.code] || 0) + adjusted;
      questionCount[q.trait.code] = (questionCount[q.trait.code] || 0) + 1;
    }

    return Object.entries(scoreMap).map(([code, rawScore]) => {
      const totalQ = questionCount[code];
      const normalized = Math.round((rawScore / (totalQ * 5)) * 30);

      return {
        assessmentType,
        traitOrCategoryCode: code,
        score: normalized,
      };
    });
  };


  // ------------------------------------------------
  // Next, Prev, Finish handlers
  // ------------------------------------------------
  const nextQuestion = () => {
    if (current < questions.length - 1) setCurrent(c => c + 1);
  };

  const prevQuestion = () => {
    if (current > 0) setCurrent(c => c - 1);
  };


  const finishAssessment = async () => {
    setSubmitting(true);

    const scores = calculateScores();
    saveToLocalStorage(`demo_scores_${assessmentType}`, scores);

    // Flow control:
    if (assessmentType === "OCEAN") {
      setSubmitting(false);
      setShowCompletionModal(true);
    }
    else if (assessmentType === "RIASEC") {
      setSubmitting(false);
      setShowRiasecCompletionModal(true);
    }
    else {
      setSubmitting(false);
      navigate("/demo/report");
    }
  };

  // ------------------------------------------------
  // Instruction transitions
  // ------------------------------------------------
  const beginRiasecTest = () => {
    setShowCompletionModal(false);
    setShowInterestInstructions(false);
    setShowOceanInstructions(false);
    setAssessmentType("RIASEC");
    setAnswers({});
  };

  const startInterestTest = () => {
    setShowCompletionModal(false);
    setShowInterestInstructions(true);
  };

  const beginAptitudeInstructions = () => {
    setShowRiasecCompletionModal(false);
    setShowAptitudeInstructions(true);
  };

  const startAptitudeTest = () => {
    setShowAptitudeInstructions(false);
    setAssessmentType("APTITUDE");
    setAnswers({});
  };


  // ------------------------------------------------
  // UI Rendering
  // ------------------------------------------------

  // Step 1: Ocean instructions
  if (showOceanInstructions && assessmentType === "OCEAN") {
    return <DemoOceanInstructions onStart={() => setShowOceanInstructions(false)} />;
  }

  // Step 2: RIASEC instructions
  if (showInterestInstructions) {
    return <InterestInstructions onStart={beginRiasecTest} />;
  }

  // Step 3: Aptitude Instructions
  if (showAptitudeInstructions) {
    return <AptitudeInstructions onStart={startAptitudeTest} />;
  }

  if (loading || submitting) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  const currentQuestion = questions[current];
  const isEnd = current === questions.length - 1;


  return (
    <div className="p-6 w-full max-w-7xl mx-auto flex flex-col min-h-[80vh]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900">
          {assessmentType === "OCEAN"
            ? "Welcome to Personality Assessment"
            : assessmentType === "RIASEC"
              ? "RIASEC Career Interest Test"
              : "Aptitude Test"}
        </h1>

        <p className="mt-2 text-lg">
          Question <strong>{current + 1} / {questions.length}</strong>
        </p>
      </div>

      {/* Card */}
      <div className="w-full bg-white rounded-xl shadow-lg p-10 flex flex-col flex-1">
        <ProgressBar current={current + 1} total={questions.length} />

        <div className="flex-1 mt-6">
          {currentQuestion &&
            (assessmentType === "APTITUDE" ? (
              <AptitudeQuestion
                data={currentQuestion}
                value={answers[currentQuestion.id]}
                onChange={(v) => handleAnswer(currentQuestion.id, v)}
              />
            ) : (
              <AssessmentQuestion
                data={currentQuestion}
                value={answers[currentQuestion.id]}
                onChange={(v) => handleAnswer(currentQuestion.id, v)}
                nextQuestion={nextQuestion}
              />
            ))}
        </div>

        {/* Navigation Footer */}
        <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={prevQuestion}
            disabled={current === 0}
            className="mr-2 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-40 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Prev
          </button>

          {!isEnd ? (
            <button
              onClick={nextQuestion}
              disabled={!answers[currentQuestion?.id]}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-40 flex items-center"
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          ) : (
            <button
              onClick={finishAssessment}
              disabled={!answers[currentQuestion?.id]}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-40 flex items-center"
            >
              Finish 👍
            </button>
          )}
        </div>
      </div>

      {/* Modals */}
      {showCompletionModal && <CompletionModal onClose={startInterestTest} />}
      {showRiasecCompletionModal && (
        <RIASECCompletionModal onClose={beginAptitudeInstructions} />
      )}
    </div>
  );
}
