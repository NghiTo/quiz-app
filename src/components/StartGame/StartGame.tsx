import React from "react";
import { useNavigate } from "react-router-dom";
import "./StartGame.css";

const StartGame: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1 className="welcome-heading">Welcome to React Quiz Game!</h1>
      </div>
      <div className="start">
        <button className="start-btn" onClick={() => navigate("/game")}>
          Start
        </button>
      </div>
    </>
  );
};

export default StartGame;
