import React from "react";
import "./Answers.css";

interface AnswersProps {
  answer: {
    answer_content: string;
    correct: boolean;
  };
  index: number;
  isSelected: boolean;
  chooseAnswer: () => void;
  isCorrect: boolean;
  reviewMode: boolean;
}

const Answers: React.FC<AnswersProps> = ({
  answer,
  index,
  isSelected,
  chooseAnswer,
  isCorrect,
  reviewMode,
}) => {
  return (
    <div
      className={`answer-container ${isSelected ? "selected" : ""} ${
        reviewMode ? "review-mode" : ""
      } ${reviewMode && isCorrect ? "correct" : ""} ${
        reviewMode && isSelected && !isCorrect ? "incorrect" : ""
      }`}
      onClick={chooseAnswer}
    >
      <p>
        {index + 1}
        {")"} {answer.answer_content}
      </p>
    </div>
  );
};

export default Answers;
