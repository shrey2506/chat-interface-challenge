// src/types/WebSpeechApi.ts

/**
 * The instance shape returned when you do "new window.SpeechRecognition()"
 * or "new window.webkitSpeechRecognition()".
 */
export interface WsrRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;

  onaudioend: ((this: WsrRecognitionInstance, ev: Event) => any) | null;
  onaudiostart: ((this: WsrRecognitionInstance, ev: Event) => any) | null;
  onend: ((this: WsrRecognitionInstance, ev: Event) => any) | null;
  onerror: ((this: WsrRecognitionInstance, ev: WsrRecognitionErrorEvent) => any) | null;
  onnomatch: ((this: WsrRecognitionInstance, ev: WsrRecognitionResultEvent) => any) | null;
  onresult: ((this: WsrRecognitionInstance, ev: WsrRecognitionResultEvent) => any) | null;
  onsoundend: ((this: WsrRecognitionInstance, ev: Event) => any) | null;
  onsoundstart: ((this: WsrRecognitionInstance, ev: Event) => any) | null;
  onspeechend: ((this: WsrRecognitionInstance, ev: Event) => any) | null;
  onspeechstart: ((this: WsrRecognitionInstance, ev: Event) => any) | null;
  onstart: ((this: WsrRecognitionInstance, ev: Event) => any) | null;

  serviceURI: string;
  abort(): void;
  start(): void;
  stop(): void;
}

/**
 * Minimal shape of the Web Speech "result" event.
 */
export interface WsrRecognitionResultEvent extends Event {
  results: WsrRecognitionResultList;
  resultIndex: number;
}

export interface WsrRecognitionResultList {
  length: number;
  item(index: number): WsrRecognitionResult;
  [index: number]: WsrRecognitionResult;
}

export interface WsrRecognitionResult {
  length: number;
  isFinal: boolean;
  item(index: number): WsrRecognitionAlternative;
  [index: number]: WsrRecognitionAlternative;
}

export interface WsrRecognitionAlternative {
  transcript: string;
  confidence: number;
}

/**
 * Minimal shape of an error event.
 */
export interface WsrRecognitionErrorEvent extends Event {
  error: WsrRecognitionErrorCode;
  message: string;
}

export type WsrRecognitionErrorCode =
  | 'aborted'
  | 'audio-capture'
  | 'bad-grammar'
  | 'language-not-supported'
  | 'network'
  | 'no-speech'
  | 'not-allowed'
  | 'service-not-allowed';

/**
 * If you want a constructor type, you could define:
 */
export type WsrRecognitionConstructor = new () => WsrRecognitionInstance;
