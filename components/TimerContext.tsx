// components/TimerContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type TimerContextType = {
  workTime: number;
  breakTime: number;
  timeLeft: number;
  isActive: boolean;
  isWorkTime: boolean;
  setWorkTime: (time: number) => void;
  setBreakTime: (time: number) => void;
  setTimeLeft: (time: number) => void;
  setIsActive: (isActive: boolean) => void;
  setIsWorkTime: (isWorkTime: boolean) => void;
  toggleTimer: () => void;
  resetTimer: () => void;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsWorkTime(!isWorkTime);
      setTimeLeft(isWorkTime ? breakTime * 60 : workTime * 60);
      playSound();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isWorkTime, workTime, breakTime]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setIsWorkTime(true);
    setTimeLeft(workTime * 60);
  };

  const playSound = () => {
    const audio = new Audio("/audios/success-48018.mp3");
    audio.play();
  };

  return (
    <TimerContext.Provider value={{
      workTime, breakTime, timeLeft, isActive, isWorkTime,
      setWorkTime, setBreakTime, setTimeLeft, setIsActive, setIsWorkTime,
      toggleTimer, resetTimer
    }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};