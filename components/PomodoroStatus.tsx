import React from 'react';
import Link from 'next/link';
import { useTimer } from '@/components/TimerContext';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';

const PomodoroStatus: React.FC = () => {
  const { timeLeft, isActive, isWorkTime } = useTimer();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-[#e7d4b5] mb-4">
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <Link href="/timer" className="mr-2">
            <ArrowLeft className="h-5 w-5 text-zinc-700 hover:text-zinc-900" />
          </Link>
          <h3 className="text-lg font-semibold text-zinc-700">Pomodoro Timer</h3>
        </div>
        <div className="text-3xl font-bold text-center mb-2 text-zinc-600">
          {formatTime(timeLeft)}
        </div>
        <div className="text-center text-sm text-zinc-600">
          {isActive ? (isWorkTime ? 'Work Time' : 'Break Time') : 'Paused'}
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroStatus;