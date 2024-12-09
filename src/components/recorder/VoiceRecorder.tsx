import React, { useState, useEffect } from 'react';
import { Mic, Square } from 'lucide-react';
import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';
import { AudioPreview } from './AudioPreview';
import { RecordingsList } from './RecordingsList';
import { RecordingTimer } from './RecordingTimer';
import { AudioVisualizer } from './AudioVisualizer';
import { useRecordingsStore } from '../../store/recordingsStore';

export function VoiceRecorder() {
  const { isRecording, audioBlob, mediaStream, error, startRecording, stopRecording } = useVoiceRecorder();
  const { addRecording } = useRecordingsStore();
  const [currentRecordingId, setCurrentRecordingId] = useState<string | null>(null);

  useEffect(() => {
    if (audioBlob) {
      const duration = 0;
      const recording = { blob: audioBlob, duration };
      const newRecording = addRecording(recording);
      setCurrentRecordingId(newRecording.id);
    }
  }, [audioBlob, addRecording]);

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
      setCurrentRecordingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4">
        {error && (
          <div className="w-full bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <button
          onClick={handleToggleRecording}
          className={`p-4 rounded-full transition-colors ${
            isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
          }`}
        >
          {isRecording ? (
            <Square className="h-6 w-6 text-white" />
          ) : (
            <Mic className="h-6 w-6 text-white" />
          )}
        </button>
        
        <div className="flex items-center gap-4">
          <RecordingTimer isRecording={isRecording} />
          {isRecording && (
            <AudioVisualizer mediaStream={mediaStream} isRecording={isRecording} />
          )}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
        </p>

        {audioBlob && currentRecordingId && (
          <div className="w-full max-w-md">
            <AudioPreview 
              audioBlob={audioBlob}
              onDelete={() => {
                useRecordingsStore.getState().deleteRecording(currentRecordingId);
                setCurrentRecordingId(null);
              }}
            />
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <RecordingsList />
      </div>
    </div>
  );
}