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
import AssessmentCompletionModal from "../../components/Assessment/AssessmentCompletionModal";
import DemoEqInstructions from "./DemoEqInstructions";
import DemoLearningInstructions from "./DemoLearningInstructions";

import { getFromLocalStorage, saveToLocalStorage } from "../../utils/localStorage.util";
import {
  assessmentTitle,
  calculateAssessmentScores,
} from "../../utils/assessmentScoring";

import { OCEAN, RIASEC, APTITUDE, EQ, LEARNING } from "../../data/demoQuestions";

import Spinner from "../../components/common/Spinner";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DemoOceanInstructions from "./DemoOceanInstructions";

function formatLikertBank(traits) {
  return traits.flatMap((trait) =>
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

export default function DemoAssessmentPage() {
  const navigate = useNavigate();

  const [assessmentType, setAssessmentType] = useState("OCEAN");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);

  const [answers, setAnswers] = useState(
    getFromLocalStorage("demo_assessment_answers") || {}
  );

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showOceanInstructions, setShowOceanInstructions] = useState(true);
  const [showInterestInstructions, setShowInterestInstructions] = useState(false);
  const [showAptitudeInstructions, setShowAptitudeInstructions] = useState(false);
  const [showEqInstructions, setShowEqInstructions] = useState(false);
  const [showLearningInstructions, setShowLearningInstructions] = useState(false);

  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showRiasecCompletionModal, setShowRiasecCompletionModal] = useState(false);
  const [showAptitudeCompletionModal, setShowAptitudeCompletionModal] = useState(false);
  const [showEqCompletionModal, setShowEqCompletionModal] = useState(false);

  useEffect(() => {
    let formatted = [];

    if (assessmentType === "OCEAN") {
      formatted = formatLikertBank(OCEAN);
    } else if (assessmentType === "RIASEC") {
      formatted = formatLikertBank(RIASEC);
    } else if (assessmentType === "EQ") {
      formatted = formatLikertBank(EQ);
    } else if (assessmentType === "LEARNING") {
      formatted = formatLikertBank(LEARNING);
    } else if (assessmentType === "APTITUDE") {
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

  const handleAnswer = (questionId, value) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
    saveToLocalStorage("demo_assessment_answers", updated);
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) setCurrent((c) => c + 1);
  };

  const prevQuestion = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const finishAssessment = async () => {
    setSubmitting(true);

    const scores = calculateAssessmentScores(assessmentType, questions, answers);
    saveToLocalStorage(`demo_scores_${assessmentType}`, scores);

    if (assessmentType === "OCEAN") {
      setSubmitting(false);
      setShowCompletionModal(true);
    } else if (assessmentType === "RIASEC") {
      setSubmitting(false);
      setShowRiasecCompletionModal(true);
    } else if (assessmentType === "APTITUDE") {
      setSubmitting(false);
      setShowAptitudeCompletionModal(true);
    } else if (assessmentType === "EQ") {
      setSubmitting(false);
      setShowEqCompletionModal(true);
    } else {
      setSubmitting(false);
      navigate("/demo/congratulations");
    }
  };

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

  const beginEqInstructions = () => {
    setShowAptitudeCompletionModal(false);
    setShowEqInstructions(true);
  };

  const startEqTest = () => {
    setShowEqInstructions(false);
    setAssessmentType("EQ");
    setAnswers({});
  };

  const beginLearningInstructions = () => {
    setShowEqCompletionModal(false);
    setShowLearningInstructions(true);
  };

  const startLearningTest = () => {
    setShowLearningInstructions(false);
    setAssessmentType("LEARNING");
    setAnswers({});
  };

  if (showOceanInstructions && assessmentType === "OCEAN") {
    return <DemoOceanInstructions onStart={() => setShowOceanInstructions(false)} />;
  }

  if (showInterestInstructions) {
    return <InterestInstructions onStart={beginRiasecTest} />;
  }

  if (showAptitudeInstructions) {
    return <AptitudeInstructions onStart={startAptitudeTest} />;
  }

  if (showEqInstructions) {
    return <DemoEqInstructions onStart={startEqTest} />;
  }

  if (showLearningInstructions) {
    return <DemoLearningInstructions onStart={startLearningTest} />;
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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900">
          {assessmentTitle(assessmentType)}
        </h1>

        <p className="mt-2 text-lg">
          Question <strong>{current + 1} / {questions.length}</strong>
        </p>
      </div>

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

        <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={prevQuestion}
            disabled={current === 0}
            className="mr-2 px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-40 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Prev
          </button>

          {!isEnd ? (
            <button
              onClick={nextQuestion}
              disabled={!answers[currentQuestion?.id]}
              className="px-6 py-2 bg-accent text-white rounded hover:bg-success disabled:opacity-40 flex items-center"
            >
              Next <FaArrowRight className="ml-2" />
            </button>
          ) : (
            <button
              onClick={finishAssessment}
              disabled={!answers[currentQuestion?.id]}
              className="px-6 py-2 bg-accent text-white rounded hover:bg-success disabled:opacity-40 flex items-center"
            >
              Finish 👍
            </button>
          )}
        </div>
      </div>

      {showCompletionModal && <CompletionModal onClose={startInterestTest} />}
      {showRiasecCompletionModal && (
        <RIASECCompletionModal onClose={beginAptitudeInstructions} />
      )}
      {showAptitudeCompletionModal && (
        <AssessmentCompletionModal
          message="Well done! You have successfully completed the aptitude test"
          onClose={beginEqInstructions}
        />
      )}
      {showEqCompletionModal && (
        <AssessmentCompletionModal
          message="Well done! You have successfully completed the emotional intelligence profile"
          onClose={beginLearningInstructions}
        />
      )}
    </div>
  );
}
