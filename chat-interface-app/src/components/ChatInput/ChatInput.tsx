// src/components/ChatInput/ChatInput.tsx

import React, { useState, FormEvent, useEffect } from 'react';
import { FiMic, FiSend } from 'react-icons/fi';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useChatSettings } from '../../context/ChatSettingContext';

interface ChatInputProps {
  onSendMessage: (text: string, isVoiceMessage?: boolean) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const { speechEnabled } = useChatSettings();
  const { isListening, transcript, startListening, stopListening } = useSpeechRecognition();

  // If transcript changes, automatically populate input
  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSendMessage(inputValue, !!transcript); // Mark message as voice if we used transcript
    setInputValue('');
  };

  const handleMicClick = () => {
    if (!speechEnabled) return;
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  return (
    <form style={styles.container} onSubmit={handleSubmit}>
      {speechEnabled && (
        <button type="button" style={styles.micBtn} onClick={handleMicClick}>
          <FiMic color={isListening ? 'red' : '#555'} />
        </button>
      )}
      <input
        type="text"
        style={styles.inputField}
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" style={styles.sendBtn}>
        <FiSend size={18} />
      </button>
    </form>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: '#fff',
    borderTop: '1px solid #ddd',
  },
  micBtn: {
    border: 'none',
    background: 'none',
    marginRight: '0.5rem',
    cursor: 'pointer',
  },
  inputField: {
    flex: 1,
    border: 'none',
    outline: 'none',
    padding: '0.5rem',
    fontSize: '1rem',
  },
  sendBtn: {
    border: 'none',
    backgroundColor: '#4285f4',
    color: '#fff',
    padding: '0.5rem',
    borderRadius: '50%',
    cursor: 'pointer',
    marginLeft: '0.5rem',
  },
};

export default ChatInput;
