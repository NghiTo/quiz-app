import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

interface Answer {
  answer_content: string;
  correct: boolean;
}

interface Question {
  id: string;
  question_content: string;
  answers: Answer[];
}

interface LocationState {
  score?: number;
  questions?: Question[];
  chosenAnswer?: Record<number, number>;
}

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    score,
    questions = [],
    chosenAnswer = {},
  } = (location.state as LocationState) || { score: 0 };

  const handleReview = () => {
    navigate("/game", { state: { reviewMode: true, questions, chosenAnswer } });
  };

  return (
    <>
      <div className="result-text">
        <h1>
          Your score is: <span>{score}</span>
        </h1>
      </div>
      <div className="result-btn">
        <button id="tryagain" onClick={() => navigate("/")}>
          Try again
        </button>
        <button id="review" onClick={handleReview}>
          Review
        </button>
      </div>
    </>
  );
};

export default Result;
