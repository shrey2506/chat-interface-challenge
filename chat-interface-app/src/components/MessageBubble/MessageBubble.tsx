import React from 'react';
import './MessageBubble.css';
import { FiMic } from 'react-icons/fi'; // For a voice icon (optional)

export type SenderType = 'user' | 'assistant';

export interface MessageBubbleProps {
  sender: SenderType;
  text: string;
  timestamp: string; // e.g., "10:31 AM"
  isVoiceMessage?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  sender,
  text,
  timestamp,
  isVoiceMessage,
}) => {
  const bubbleClass =
    sender === 'user' ? "userBubble" : "assistantBubble";

  return (
    <div className={`messageRow ${sender === 'user' && "userRow"}`}>
      <div className={bubbleClass}>
        {isVoiceMessage && (
          <div className="voiceMessageLabel">
            <FiMic /> Voice message
          </div>
        )}
        <div className="messageText">{text}</div>
        <div className="timestamp">{timestamp}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
