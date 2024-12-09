import React from 'react';
import { useRecordingsStore } from '../store/recordingsStore';
import { AudioPreview } from '../components/recorder/AudioPreview';
import { formatDate } from '../utils/formatDate';

export function NotesPage() {
  const { recordings } = useRecordingsStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Notes</h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {recordings.length} {recordings.length === 1 ? 'recording' : 'recordings'}
        </span>
      </div>

      {recordings.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            No recordings yet. Start by recording your first note!
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {recordings.map((recording) => (
            <div
              key={recording.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {recording.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(recording.timestamp)}
                  </p>
                </div>
              </div>

              <AudioPreview
                audioBlob={recording.blob}
                onDelete={() => useRecordingsStore.getState().deleteRecording(recording.id)}
              />

              {recording.transcription && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Transcription
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-wrap">
                    {recording.transcription}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}