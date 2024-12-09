import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface RecordingTimerProps {
  isRecording: boolean;
}

export function RecordingTimer({ isRecording }: RecordingTimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRecording) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isRecording) return null;

  return (
    <div className="flex items-center justify-center space-x-2 text-red-500 animate-pulse">
      <Clock className="h-5 w-5" />
      <span className="font-mono text-lg">{formatTime(seconds)}</span>
    </div>
  );
}