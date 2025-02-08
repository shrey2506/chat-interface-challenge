// src/components/MessageBubble/MessageBubble.tsx

import React from 'react';
import { Message } from '../../services/ChatService';
import { FiMic } from 'react-icons/fi';

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.sender === 'user';

  const bubbleStyle = {
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    backgroundColor: isUser ? '#4285f4' : '#fff',
    color: isUser ? '#fff' : '#333',
    borderRadius: 8,
    padding: '0.75rem',
    margin: '0.5rem 0',
    maxWidth: '60%',
  };

  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={bubbleStyle}>
        {message.isVoiceMessage && (
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
            <FiMic style={{ marginRight: 4 }} /> Voice message
          </div>
        )}
        <div>{message.text}</div>
        <div style={{ fontSize: '0.7rem', color: isUser ? '#eee' : '#999', marginTop: 4, textAlign: 'right' }}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
