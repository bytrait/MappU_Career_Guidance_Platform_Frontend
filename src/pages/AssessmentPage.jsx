import { useEffect, useState, useRef, useCallback } from "react";
import ProgressBar from "../components/Assessment/ProgressBar";
import AssessmentQuestion from "../components/Assessment/AssessmentQuestion";
import AptitudeQuestion from "../components/Assessment/AptitudeQuestion";
import CompletionModal from "../components/Assessment/CompletionModal";
import InterestInstructions from "../components/Assessment/InterestInstructions";
import RIASECCompletionModal from "../components/Assessment/RIASECCompletionModal";
import AptitudeInstructions from "../components/Assessment/AptitudeInstructions";
import OceanInstructions from "../components/Assessment/OceanInstructions";
import EqInstructions from "../components/Assessment/EqInstructions";
import LearningInstructions from "../components/Assessment/LearningInstructions";
import AssessmentCompletionModal from "../components/Assessment/AssessmentCompletionModal";
import { interleaveQuestions } from "../utils/interleave.util";
import {
  fetchAssessmentQuestions,
  submitScores,
} from "../services/assessmentService";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage.util";
import {
  completeUserProgress,
  fetchUserProgress,
  startUserProgress,
  updateUserProgress,
  fetchAssessmentState,
  saveAssessmentState,
  clearAssessmentState,
} from "../services/userAssessmentProgressService";
import {
  assessmentTitle,
  calculateAssessmentScores,
} from "../utils/assessmentScoring";

import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Spinner from "../components/common/Spinner";

export default function AssessmentPage() {
  const navigation = useNavigate();
  const [assessmentType, setAssessmentType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(
    getFromLocalStorage("assessment_answers") || {}
  );
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showInterestInstructions, setShowInterestInstructions] = useState(false);
  const [showRiasecCompletionModal, setShowRiasecCompletionModal] = useState(false);
  const [showAptitudeInstructions, setShowAptitudeInstructions] = useState(false);
  const [showOceanInstructions, setShowOceanInstructions] = useState(false);
  const [showAptitudeCompletionModal, setShowAptitudeCompletionModal] = useState(false);
  const [showEqInstructions, setShowEqInstructions] = useState(false);
  const [showEqCompletionModal, setShowEqCompletionModal] = useState(false);
  const [showLearningInstructions, setShowLearningInstructions] = useState(false);

  const saveTimeoutRef = useRef(null);

  // Debounced server state persistence
  const persistStateToServer = useCallback((type, currIdx, ans) => {
    if (!type || type === "COMPLETED") return;
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      saveAssessmentState({
        assessmentType: type,
        currentQuestionIndex: currIdx,
        answers: ans,
      }).catch((err) => {
        console.error("Failed to auto-save assessment state to server:", err);
      });
    }, 300);
  }, []);

  useEffect(() => {
    fetchUserProgress()
      .then((progress) => {
        if (!progress) {
          startUserProgress("OCEAN").then((p) => {
            setAssessmentType(p.currentStage);
            setShowOceanInstructions(true);
          });
        } else {
          setAssessmentType(progress.currentStage || "COMPLETED");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch progress", err);
      });
  }, []);

  useEffect(() => {
    if (assessmentType === "COMPLETED" || assessmentType === null) return;

    setLoading(true);

    // Fetch questions and saved state in parallel
    Promise.all([
      fetchAssessmentQuestions(assessmentType),
      fetchAssessmentState(assessmentType).catch(() => null),
    ])
      .then(([data, savedServerState]) => {
        let formatted;
        if (assessmentType === "APTITUDE") {
          formatted = data.map((q) => ({
            id: q.id,
            text: q.text,
            options: q.options || [],
            trait: q.trait,
            order: q.order,
          }));
        } else {
          formatted = data.flatMap((trait) =>
            trait.questions.map((q) => ({
              id: q.id,
              text: q.text,
              reverse: q.reverse,
              trait: {
                id: trait.id,
                code: trait.code,
                name: trait.name,
              },
              order: q.order,
            }))
          );
        }

        // Static, deterministic interleaving across traits
        const staticOrderedQuestions = interleaveQuestions(formatted, assessmentType);
        setQuestions(staticOrderedQuestions);
        saveToLocalStorage(`assessment_questions_${assessmentType}`, staticOrderedQuestions);

        // Hydrate answers from server state merged with local storage
        const localAnswers = getFromLocalStorage("assessment_answers") || {};
        const serverAnswers = savedServerState?.answers || {};
        const combinedAnswers = { ...localAnswers, ...serverAnswers };

        setAnswers(combinedAnswers);
        saveToLocalStorage("assessment_answers", combinedAnswers);

        // Resume at saved question index or first unanswered question
        let resumeIndex = 0;
        if (typeof savedServerState?.currentQuestionIndex === "number" && savedServerState.currentQuestionIndex >= 0) {
          resumeIndex = Math.min(savedServerState.currentQuestionIndex, Math.max(0, staticOrderedQuestions.length - 1));
        } else {
          const firstUnansweredIndex = staticOrderedQuestions.findIndex((q) => combinedAnswers[q.id] == null);
          resumeIndex = firstUnansweredIndex !== -1 ? firstUnansweredIndex : 0;
        }

        setCurrent(resumeIndex);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load assessment and state:", err);
        setLoading(false);
      });
  }, [assessmentType]);

  const handleAnswer = (questionId, value) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
    saveToLocalStorage("assessment_answers", updated);
    persistStateToServer(assessmentType, current, updated);
  };

  const submitScoresToAPI = async () => {
    const scores = calculateAssessmentScores(assessmentType, questions, answers);
    try {
      await submitScores(scores);
      console.log(`${assessmentType} scores submitted`, scores);
    } catch (err) {
      console.error("Failed to submit scores:", err);
    }
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      const nextIdx = current + 1;
      setCurrent(nextIdx);
      persistStateToServer(assessmentType, nextIdx, answers);
    }
  };

  const prevQuestion = () => {
    if (current > 0) {
      const prevIdx = current - 1;
      setCurrent(prevIdx);
      persistStateToServer(assessmentType, prevIdx, answers);
    }
  };

  const finishAssessment = async () => {
    setSubmitting(true);
    await submitScoresToAPI();

    // Clear server in-progress state and local cache for completed stage
    await clearAssessmentState(assessmentType).catch(() => {});
    saveToLocalStorage("assessment_answers", {});
    setAnswers({});

    if (assessmentType === "OCEAN") {
      await updateUserProgress("RIASEC");
      setSubmitting(false);
      setShowCompletionModal(true);
    } else if (assessmentType === "RIASEC") {
      await updateUserProgress("APTITUDE");
      setSubmitting(false);
      setShowRiasecCompletionModal(true);
    } else if (assessmentType === "APTITUDE") {
      await updateUserProgress("EQ");
      setSubmitting(false);
      setShowAptitudeCompletionModal(true);
    } else if (assessmentType === "EQ") {
      await updateUserProgress("LEARNING");
      setSubmitting(false);
      setShowEqCompletionModal(true);
    } else {
      await completeUserProgress();
      setSubmitting(false);
      setAssessmentType("COMPLETED");
    }
  };

  const startInterestTest = () => {
    setShowCompletionModal(false);
    setShowInterestInstructions(true);
  };

  const beginRiasecTest = () => {
    setShowInterestInstructions(false);
    setAssessmentType("RIASEC");
    saveToLocalStorage("assessment_type", "RIASEC");
    setAnswers({});
  };

  const beginAptitudeInstructions = () => {
    setShowRiasecCompletionModal(false);
    setShowAptitudeInstructions(true);
  };

  const startAptitudeTest = () => {
    setShowAptitudeInstructions(false);
    setAssessmentType("APTITUDE");
    saveToLocalStorage("assessment_type", "APTITUDE");
    setAnswers({});
  };

  const beginEqInstructions = () => {
    setShowAptitudeCompletionModal(false);
    setShowEqInstructions(true);
  };

  const startEqTest = () => {
    setShowEqInstructions(false);
    setAssessmentType("EQ");
    saveToLocalStorage("assessment_type", "EQ");
    setAnswers({});
  };

  const beginLearningInstructions = () => {
    setShowEqCompletionModal(false);
    setShowLearningInstructions(true);
  };

  const startLearningTest = () => {
    setShowLearningInstructions(false);
    setAssessmentType("LEARNING");
    saveToLocalStorage("assessment_type", "LEARNING");
    setAnswers({});
  };

  const currentQuestion = questions[current];
  const isEnd = current === questions.length - 1;

  if (assessmentType === "COMPLETED") {
    navigation("/congratulations");
  }

  if (showOceanInstructions && assessmentType === "OCEAN") {
    return <OceanInstructions onStart={() => setShowOceanInstructions(false)} />;
  }

  if (showInterestInstructions) {
    return <InterestInstructions onStart={beginRiasecTest} />;
  }

  if (showAptitudeInstructions) {
    return <AptitudeInstructions onStart={startAptitudeTest} />;
  }

  if (showEqInstructions) {
    return <EqInstructions onStart={startEqTest} />;
  }

  if (showLearningInstructions) {
    return <LearningInstructions onStart={startLearningTest} />;
  }

  if (loading || submitting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6 w-full max-w-7xl mx-auto flex flex-col min-h-[80vh]">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">
          {assessmentTitle(assessmentType)}
        </h1>
        <p className="mt-2 text-lg">
          Question <strong>{current + 1} / {questions.length}</strong>
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-10 flex flex-col flex-1">
        <ProgressBar current={current + 1} total={questions.length} />
        <div className="flex-1 flex flex-col">
          {currentQuestion &&
            (assessmentType === "APTITUDE" ? (
              <AptitudeQuestion
                data={currentQuestion}
                value={answers[currentQuestion.id]}
                onChange={(val) => handleAnswer(currentQuestion.id, val)}
              />
            ) : (
              <AssessmentQuestion
                data={currentQuestion}
                value={answers[currentQuestion.id]}
                onChange={(val) => handleAnswer(currentQuestion.id, val)}
                nextQuestion={nextQuestion}
              />
            ))}
        </div>

        <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={prevQuestion}
            disabled={current === 0}
            className="mr-2 px-6 py-2 rounded bg-primary text-white font-semibold hover:bg-primary-dark disabled:opacity-50 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Prev
          </button>
          {!isEnd ? (
            <button
              onClick={nextQuestion}
              disabled={!answers[currentQuestion?.id]}
              className="px-4 py-2 rounded bg-accent text-white font-semibold hover:bg-success disabled:opacity-50 flex items-center"
            >
              Next
              <FaArrowRight className="ml-2" />
            </button>
          ) : (
            <button
              onClick={finishAssessment}
              disabled={!answers[currentQuestion?.id]}
              className="px-6 py-2 rounded bg-accent text-white font-semibold hover:bg-success disabled:opacity-50 flex items-center"
            >
              Finish <span className="ml-2" role="img" aria-label="thumbs up">👍</span>
            </button>
          )}
        </div>
      </div>

      {showCompletionModal && (
        <CompletionModal onClose={startInterestTest} />
      )}
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

