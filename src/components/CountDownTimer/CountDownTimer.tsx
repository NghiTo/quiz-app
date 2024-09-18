import React, { useState, useEffect } from "react";
import "./CountDownTimer.css";

interface CountdownTimerProps {
  initialTime: number;
  onTimeUp: () => void;
  reviewMode: boolean;
}

const CountDownTimer: React.FC<CountdownTimerProps> = ({
  initialTime,
  onTimeUp,
  reviewMode,
}) => {
  const [time, setTime] = useState<number>(initialTime);

  useEffect(() => {
    if (reviewMode) return; // Dừng bộ đếm khi ở chế độ review
    if (time <= 0) {
      onTimeUp(); // Kết thúc bộ đếm khi hết thời gian
      return;
    }
    const timerId = setInterval(
      () => setTime((prevTime) => prevTime - 1),
      1000
    );
    return () => clearInterval(timerId);
  }, [time, reviewMode, onTimeUp]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const circleStyle = {
    strokeDasharray: 283,
    strokeDashoffset: 283 - (283 * time) / initialTime,
  };

  return (
    <div className="countdown-timer">
      <svg className="progress-ring" height="120" width="120">
        <circle
          className="progress-ring__circle"
          stroke={time <= 5 ? "#ff0000" : "#007bff"}
          strokeWidth="4"
          fill="transparent"
          r="45"
          cx="60"
          cy="60"
          style={circleStyle}
        />
      </svg>
      <div className="timer">
        {reviewMode
          ? "End"
          : `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
      </div>
    </div>
  );
};

export default CountDownTimer;
