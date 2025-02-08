import { useState, useEffect, useRef } from 'react';
import {
  WsrRecognitionInstance,
  WsrRecognitionResultEvent,
  WsrRecognitionConstructor
} from '../types/WebSpeechApi';

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  // We'll store the instance shape in our ref
  const recognitionRef = useRef<WsrRecognitionInstance | null>(null);

  useEffect(() => {
    // 1. Try webkitSpeechRecognition
    if ('webkitSpeechRecognition' in window) {
      // TS has no idea what 'webkitSpeechRecognition' exactly is, so cast it:
      const Recognition = window.webkitSpeechRecognition as unknown as WsrRecognitionConstructor;
      const recognition = new Recognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognitionRef.current = recognition;
    }
    // 2. Otherwise, try SpeechRecognition
    else if ('SpeechRecognition' in window) {
      const Recognition = window.SpeechRecognition as unknown as WsrRecognitionConstructor;
      const recognition = new Recognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setTranscript('');
    setIsListening(true);
    recognitionRef.current.start();

    // We'll type the event param as WsrRecognitionResultEvent
    recognitionRef.current.onresult = (event: WsrRecognitionResultEvent) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
    setIsListening(false);
  };

  return { isListening, transcript, startListening, stopListening };
}
