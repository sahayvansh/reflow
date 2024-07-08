import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const MiniGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setGameActive(true);
    moveTarget();
  };

  const moveTarget = () => {
    const newX = Math.floor(Math.random() * 180);
    const newY = Math.floor(Math.random() * 180);
    setTargetPosition({ x: newX, y: newY });
  };

  const handleClick = () => {
    if (gameActive) {
      setScore((prevScore) => prevScore + 1);
      moveTarget();
    }
  };

  return (
    <div className="w-full bg-[#e7d4b5] rounded-lg p-4 flex flex-col items-center justify-center">
      <h3 className="text-xl font-bold mb-4 text-zinc-700">Reflex Game!</h3>
      {!gameActive ? (
        <Button onClick={startGame} className="mb-4 bg-accent text-slate-500 hover:bg-accent hover:text-white">Start Game</Button>
      ) : (
        <div className="w-[200px] h-[200px] bg-background relative">
          <div
            className="absolute w-4 h-4 bg-accent rounded-full cursor-pointer"
            style={{ left: `${targetPosition.x}px`, top: `${targetPosition.y}px` }}
            onClick={handleClick}
          />
        </div>
      )}
      <div className="mt-4 text-text">
        <p>Score: {score}</p>
        <p>Time Left: {timeLeft}s</p>
      </div>
    </div>
  );
};

export default MiniGame;