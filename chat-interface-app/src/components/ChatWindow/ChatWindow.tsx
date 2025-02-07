import React, { useEffect, useRef } from 'react';
import './ChatWindow.css';
import MessageBubble, { MessageBubbleProps } from '../MessageBubble/MessageBubble';

interface ChatWindowProps {
  messages: MessageBubbleProps[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chatWindow">
      {messages.map((msg, idx) => (
        <MessageBubble
          key={idx}
          sender={msg.sender}
          text={msg.text}
          timestamp={msg.timestamp}
          isVoiceMessage={msg.isVoiceMessage}
        />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatWindow;
