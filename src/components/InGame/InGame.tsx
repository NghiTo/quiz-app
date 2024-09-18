import React, { useEffect, useState } from "react";
import Answers from "../Answers/Answers";
import CountdownTimer from "../CountDownTimer/CountDownTimer";
import { useNavigate, useLocation } from "react-router-dom";
import "./InGame.css"

interface Question {
  question_content: string;
  answers: { answer_content: string; correct: boolean }[];
}

interface LocationState {
  reviewMode: boolean;
  questions: Question[];
  chosenAnswer: Record<number, number>;
}

const InGame: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [chosenAnswer, setChosenAnswer] = useState<Record<number, number>>({});
  const [reviewMode, setReviewMode] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isPreviousDisabled = currentQuestionIndex === 0;
  const isNextDisabled = currentQuestionIndex === questions.length - 1;
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswerIndex = chosenAnswer[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = (): number => {
    const score = questions.reduce((acc, question, index) => {
      const selectedIndex = chosenAnswer[index];
      if (selectedIndex !== undefined) {
        return acc + (question.answers[selectedIndex].correct ? 1 : 0);
      }
      return acc;
    }, 0);
    return score;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    if (window.confirm("Do you want to submit answers?")) {
      navigate("/result", { state: { score, questions, chosenAnswer } });
    }
  };

  const handleTimeUp = () => {
    const score = calculateScore();
    navigate("/result", { state: { score, questions, chosenAnswer } });
  };

  const handleChooseAnswer = (index: number) => {
    if (!reviewMode) {
      setChosenAnswer((pre) => ({ ...pre, [currentQuestionIndex]: index }));
    }
  };

  const handleRestart = () => {
    navigate("/");
  };

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data: Question[]) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  useEffect(() => {
    if (location.state) {
      const state = location.state as LocationState;
      if (state.reviewMode) {
        setReviewMode(true);
        setQuestions(state.questions);
        setChosenAnswer(state.chosenAnswer);
      }
    }
  }, [location.state]);
  
  return (
    <div className="ingame-container">
      <div className="test-btn">
        <button
          id="previous"
          className={isPreviousDisabled ? "disabled" : ""}
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
        >
          Previous
        </button>
        <button
          id="next"
          onClick={handleNext}
          className={isNextDisabled ? "disabled" : ""}
          disabled={isNextDisabled}
        >
          Next
        </button>
        {isNextDisabled && !reviewMode && (
          <button id="submit" onClick={handleSubmit}>
            Submit
          </button>
        )}
        {reviewMode && (
          <button id="restart" onClick={handleRestart}>
            Restart
          </button>
        )}
      </div>
      <CountdownTimer
        initialTime={90}
        onTimeUp={handleTimeUp}
        reviewMode={reviewMode}
      />
      <div className="question-container">
        {currentQuestion ? (
          <>
            <div className="question-text">
              <p>
                Question <span>{currentQuestionIndex + 1}</span>/
                {questions.length}
              </p>
            </div>
            <div className="question">
              <p>{currentQuestion.question_content}</p>
            </div>
          </>
        ) : (
          <p>No questions available.</p>
        )}
      </div>
      {currentQuestion && (
        <>
          {currentQuestion.answers.map((answer, index) => (
            <Answers
              key={index}
              answer={answer}
              index={index}
              chooseAnswer={() => handleChooseAnswer(index)}
              isSelected={index === currentAnswerIndex}
              isCorrect={answer.correct}
              reviewMode={reviewMode}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default InGame;
