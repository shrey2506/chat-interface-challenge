import React, { useState } from 'react';
import './ChatInput.css';
import { FiMic, FiSend } from 'react-icons/fi';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onVoiceClick?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onVoiceClick }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <form className="chatInputContainer" onSubmit={handleSubmit}>
      {onVoiceClick && (
        <button type="button" onClick={onVoiceClick} className="voiceButton">
          <FiMic size={18} />
        </button>
      )}
      <input
        type="text"
        placeholder="Type your message..."
        className="inputField"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit" className="sendButton">
        <FiSend size={18} />
      </button>
    </form>
  );
};

export default ChatInput;
