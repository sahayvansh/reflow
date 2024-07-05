'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTimer } from '@/components/TimerContext';

const DEFAULT_TIMES = [
  { name: 'Classic', work: 25, break: 5 },
  { name: 'Long Focus', work: 50, break: 10 },
  { name: 'Short Sprints', work: 15, break: 3 },
];

export default function TimerPage() {
  const {
    workTime, breakTime, timeLeft, isActive, isWorkTime,
    setWorkTime, setBreakTime, setTimeLeft, toggleTimer, resetTimer
  } = useTimer();
  const router = useRouter();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text bg-grain">
      <Header />
      <div className="container mx-auto mt-10 p-6 bg-background text-text">
        <h1 className="text-4xl font-bold mb-8 text-center text-secondary">Pomodoro Timer</h1>
        
        <div className="max-w-md mx-auto bg-secondary p-6 rounded-lg shadow-lg">
          <motion.div 
            className="text-6xl font-bold text-center mb-8"
            initial={{ scale: 1 }}
            animate={{ scale: isActive ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          >
            {formatTime(timeLeft)}
          </motion.div>
          
          <div className="flex justify-center space-x-4 mb-8">
            <Button onClick={toggleTimer} variant="outline" className="w-32">
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={resetTimer} variant="outline" className="w-32">Reset</Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Work Time (min)</label>
              <Input
                type="number"
                value={workTime}
                onChange={(e) => {
                  const newWorkTime = Number(e.target.value);
                  setWorkTime(newWorkTime);
                  if (isWorkTime) setTimeLeft(newWorkTime * 60);
                }}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Break Time (min)</label>
              <Input
                type="number"
                value={breakTime}
                onChange={(e) => {
                  const newBreakTime = Number(e.target.value);
                  setBreakTime(newBreakTime);
                  if (!isWorkTime) setTimeLeft(newBreakTime * 60);
                }}
                className="w-full"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold ml-32 mb-2">Quick Presets</h3>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_TIMES.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  className="text-sm ml-4"
                  onClick={() => {
                    setWorkTime(preset.work);
                    setBreakTime(preset.break);
                    setTimeLeft(preset.work * 60);
                    resetTimer();
                  }}
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Button 
            onClick={() => router.push('/breaks')}
            variant="outline"
            className="bg-accent text-slate-500 hover:bg-accent hover:text-white"
          >
            Explore Smart Breaks
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}