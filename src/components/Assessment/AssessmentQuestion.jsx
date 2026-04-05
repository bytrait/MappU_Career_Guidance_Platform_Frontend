import { useState } from "react";
import OptionRadioGroup from "./OptionRadioGroup";

export default function AssessmentQuestion({ data, value, onChange, nextQuestion }) {
  const [localSelection, setLocalSelection] = useState(value);
  const [blinking, setBlinking] = useState(false);

  const handleChange = (selectedValue) => {
    // update local state immediately → blue highlight shows right away
    setLocalSelection(selectedValue);

    // also update parent (answers state)
    onChange(selectedValue);

    setBlinking(true);

    // delay before moving to next question
    setTimeout(() => {
      setBlinking(false);
      if (nextQuestion) {
        nextQuestion();
        setLocalSelection(null); // reset local state for next Q
      }
    }, 300);
  };

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .blink {
          animation: blink 0.3s linear;
        }
      `}</style>
      <div className={`mt-6 bg-white rounded-xl p-6 ${blinking ? "blink" : ""}`}>
        <h3 className="text-xl font-semibold text-gray-700">{data.text.en}</h3>
        <h4 className="text-lg font-semibold text-gray-600 mb-2">{data.text.mr}</h4>
        <p className="mb-6 text-gray-500">Select one of the below options:</p>

        <OptionRadioGroup
          name={`answer-${data.id}`}
          value={localSelection ?? value} // 👈 use localSelection first
          onChange={handleChange}
          options={[
            { id: "stronglyDisagree", label: "Strongly Disagree", value: 1 },
            { id: "slightlyDisagree", label: "Slightly Disagree", value: 2 },
            { id: "neitherAgreeNorDisagree", label: "Neither Agree Nor Disagree", value: 3 },
            { id: "slightlyAgree", label: "Slightly Agree", value: 4 },
            { id: "stronglyAgree", label: "Strongly Agree", value: 5 },
          ]}
        />
      </div>
    </>
  );
}
