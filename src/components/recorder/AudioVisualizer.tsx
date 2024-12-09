import React, { useRef, useEffect } from 'react';

interface AudioVisualizerProps {
  mediaStream: MediaStream | null;
  isRecording: boolean;
}

export function AudioVisualizer({ mediaStream, isRecording }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const analyzerRef = useRef<AnalyserNode>();
  const dataArrayRef = useRef<Uint8Array>();

  useEffect(() => {
    if (!mediaStream || !isRecording || !canvasRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(mediaStream);
    const analyzer = audioContext.createAnalyser();
    
    // Increase sensitivity by reducing FFT size and adjusting smoothing
    analyzer.fftSize = 128;
    analyzer.smoothingTimeConstant = 0.5;
    source.connect(analyzer);
    
    analyzerRef.current = analyzer;
    const bufferLength = analyzer.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    const draw = () => {
      if (!isRecording) return;
      
      const width = canvas.width;
      const height = canvas.height;
      const analyzer = analyzerRef.current!;
      const dataArray = dataArrayRef.current!;
      
      analyzer.getByteFrequencyData(dataArray);
      
      ctx.fillStyle = 'rgb(24, 24, 27)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgb(99, 102, 241)';
      ctx.beginPath();
      
      const sliceWidth = width / bufferLength;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        // Increase visualization amplitude
        const v = (dataArray[i] / 255.0) * 1.5;
        const y = height - (v * height);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        
        x += sliceWidth;
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.fill();
      ctx.stroke();
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      audioContext.close();
    };
  }, [mediaStream, isRecording]);

  return (
    <div className="w-full max-w-[200px] bg-zinc-900 rounded-lg p-2">
      <canvas
        ref={canvasRef}
        width={200}
        height={40}
        className="w-full h-[40px]"
      />
    </div>
  );
}