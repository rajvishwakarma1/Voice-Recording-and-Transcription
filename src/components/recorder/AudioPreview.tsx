import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Trash2 } from 'lucide-react';
import { formatTime } from '../../utils/formatTime';

interface AudioPreviewProps {
  audioBlob: Blob;
  onDelete: () => void;
}

export function AudioPreview({ audioBlob, onDelete }: AudioPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (audioRef.current && audioBlob instanceof Blob) {
      // Clean up previous URL
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
      
      // Create new URL
      const url = URL.createObjectURL(audioBlob);
      audioUrlRef.current = url;
      audioRef.current.src = url;
      
      // Reset states when new audio is loaded
      setCurrentTime(0);
      setDuration(null);
      setIsLoading(true);
      
      return () => {
        if (audioUrlRef.current) {
          URL.revokeObjectURL(audioUrlRef.current);
          audioUrlRef.current = null;
        }
      };
    }
  }, [audioBlob]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handleDurationChange = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
        setIsLoading(false);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
        setIsLoading(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col space-y-2 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg w-full">
      <div className="flex items-center space-x-4">
        <audio ref={audioRef} />
        <button
          onClick={togglePlayback}
          disabled={isLoading}
          className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white disabled:opacity-50"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </button>
        <div className="flex-1">
          <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 tabular-nums min-w-[80px] text-right">
          {isLoading ? (
            "Loading..."
          ) : (
            `${formatTime(currentTime)} / ${formatTime(duration || 0)}`
          )}
        </div>
        <button
          onClick={onDelete}
          className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}