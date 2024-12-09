import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Recording {
  id: string;
  blob: Blob;
  name: string;
  timestamp: number;
  duration: number;
  transcription?: string;
}

interface RecordingsState {
  recordings: Recording[];
  addRecording: (recording: Omit<Recording, 'id' | 'name' | 'timestamp'>) => Recording;
  deleteRecording: (id: string) => void;
  updateRecording: (id: string, updates: Partial<Recording>) => void;
}

// Custom storage to handle Blob serialization/deserialization
const customStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    
    const data = JSON.parse(str);
    if (data.state.recordings) {
      data.state.recordings = data.state.recordings.map((recording: any) => ({
        ...recording,
        blob: new Blob([new Uint8Array(recording.blobData)], { type: 'audio/webm' })
      }));
    }
    return JSON.stringify(data);
  },
  
  setItem: async (name: string, value: string): Promise<void> => {
    const data = JSON.parse(value);
    if (data.state.recordings) {
      // Convert Blobs to Uint8Array for storage
      const processedRecordings = await Promise.all(
        data.state.recordings.map(async (recording: Recording) => {
          const arrayBuffer = await new Response(recording.blob).arrayBuffer();
          return {
            ...recording,
            blobData: Array.from(new Uint8Array(arrayBuffer)),
            blob: undefined
          };
        })
      );
      data.state.recordings = processedRecordings;
    }
    localStorage.setItem(name, JSON.stringify(data));
  },
  
  removeItem: async (name: string): Promise<void> => {
    localStorage.removeItem(name);
  },
};

export const useRecordingsStore = create<RecordingsState>()(
  persist(
    (set, get) => ({
      recordings: [],
      addRecording: (recording) => {
        const count = get().recordings.length + 1;
        const date = new Date();
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        
        const newRecording: Recording = {
          id: crypto.randomUUID(),
          name: `Recording ${count} (${formattedDate}, ${formattedTime})`,
          timestamp: date.getTime(),
          ...recording,
        };
        
        set((state) => ({
          recordings: [newRecording, ...state.recordings],
        }));

        return newRecording;
      },
      deleteRecording: (id) => set((state) => ({
        recordings: state.recordings.filter((r) => r.id !== id),
      })),
      updateRecording: (id, updates) => set((state) => ({
        recordings: state.recordings.map((r) => 
          r.id === id ? { ...r, ...updates } : r
        ),
      })),
    }),
    {
      name: 'recordings-storage',
      storage: createJSONStorage(() => customStorage),
    }
  )
);