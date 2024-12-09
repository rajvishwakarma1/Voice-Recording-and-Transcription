import React from 'react';
import { VoiceRecorder } from '../components/recorder/VoiceRecorder';
import { NoteEditor } from '../components/notes/NoteEditor';

export function HomePage() {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <VoiceRecorder />
      </div>
      <NoteEditor />
    </div>
  );
}