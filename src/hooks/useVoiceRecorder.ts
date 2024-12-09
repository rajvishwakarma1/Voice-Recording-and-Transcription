import { useState, useCallback } from 'react';

interface RecordingState {
  isRecording: boolean;
  audioBlob: Blob | null;
  mediaStream: MediaStream | null;
  duration: number;
  error: string | null;
}

export function useVoiceRecorder() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [state, setState] = useState<RecordingState>({
    isRecording: false,
    audioBlob: null,
    mediaStream: null,
    duration: 0,
    error: null,
  });

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setState(prev => ({ 
          ...prev, 
          audioBlob: blob, 
          isRecording: false,
          mediaStream: null 
        }));
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setState(prev => ({ 
        ...prev, 
        isRecording: true, 
        error: null,
        mediaStream: stream 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Microphone access denied. Please enable microphone access and try again.' 
      }));
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  }, [mediaRecorder]);

  return {
    ...state,
    startRecording,
    stopRecording,
  };
}