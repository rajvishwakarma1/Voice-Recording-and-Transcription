# VoiceNotes - Voice Recording & Note-Taking App

A modern web application for recording voice notes with real-time audio visualization, transcription capabilities, and a built-in note editor. Features a beautiful dark/light mode theme and a convenient task management system.

![VoiceNotes Demo](https://i.imgur.com/YourImageHere.png)

## Features

- 🎙️ Voice Recording with Real-time Visualization
- 📝 Audio Transcription
- 🌓 Dark/Light Mode Toggle
- ✅ Quick Task Management
- 📊 Real-time Audio Waveform Display
- 📑 Rich Text Note Editor
- 💾 Local Storage Persistence
- 📱 Responsive Design

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Text Editor**: TipTap
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Router**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/voice-notes.git
cd voice-notes
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── layout/        # Layout components
│   ├── notes/         # Note editor components
│   ├── recorder/      # Voice recorder components
│   └── sidebar/       # Sidebar components
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # Service layer
├── store/             # Zustand store
└── utils/             # Utility functions
```

## Key Features Explained

### Voice Recording
- Real-time audio recording with waveform visualization
- Audio playback controls
- Recording list management

### Note Editor
- Rich text editing capabilities
- Markdown support
- Auto-saving

### Task Management
- Slide-out task panel
- Quick task addition and management
- Task completion tracking

### Theme Switching
- System-wide dark/light mode
- Persistent theme preference
- Smooth transitions

## Screenshots

### Home Page - Light Mode
![Home Page Light](https://i.imgur.com/YourImageHere.png)

### Recording Interface - Dark Mode
![Recording Dark](https://i.imgur.com/YourImageHere.png)

### Notes Page
![Notes Page](https://i.imgur.com/YourImageHere.png)

### Task Panel
![Task Panel](https://i.imgur.com/YourImageHere.png)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TipTap](https://tiptap.dev/) for the rich text editor
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the styling system