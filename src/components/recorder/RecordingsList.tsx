import React, { useState } from 'react';
import { useRecordingsStore } from '../../store/recordingsStore';
import { AudioPreview } from './AudioPreview';
import { formatDate } from '../../utils/formatDate';
import { transcribeAudio } from '../../services/transcriptionService';

export function RecordingsList() {
  const { recordings, updateRecording } = useRecordingsStore();
  const [isTranscribing, setIsTranscribing] = useState<string | null>(null);

  const handleTranscribe = async (recordingId: string, audioBlob: Blob) => {
    try {
      setIsTranscribing(recordingId);
      const text = await transcribeAudio(audioBlob);
      updateRecording(recordingId, { transcription: text });
    } catch (error) {
      console.error('Transcription failed:', error);
    } finally {
      setIsTranscribing(null);
    }
  };

  if (recordings.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        No recordings yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Previous Recordings
      </h2>
      {recordings.map((recording) => (
        <div key={recording.id} className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {recording.name}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(recording.timestamp)}
            </span>
          </div>
          <AudioPreview
            audioBlob={recording.blob}
            onDelete={() => useRecordingsStore.getState().deleteRecording(recording.id)}
          />
          {!recording.transcription && (
            <button
              onClick={() => handleTranscribe(recording.id, recording.blob)}
              disabled={isTranscribing !== null}
              className="w-full mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md disabled:opacity-50 text-sm"
            >
              {isTranscribing === recording.id ? 'Transcribing...' : 'Transcribe Audio'}
            </button>
          )}
          {recording.transcription && (
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {recording.transcription}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}