import React, { useState } from 'react';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatWindow from './ChatWindow/ChatWindow';
import QuickReplies from './QuickReplies/QuickReplies';
import ChatInput from './ChatInput/ChatInput';
import { MessageBubbleProps } from './MessageBubble/MessageBubble';


const initialMessages: MessageBubbleProps[] = [
  {
    sender: 'assistant',
    text: 'Hello! How can I assist you today?',
    timestamp: '10:30 AM',
  },
  {
    sender: 'assistant',
    text: 'Here are some React resources:',
    timestamp: '10:31 AM',
  },
  {
    sender: 'assistant',
    text: '• React Documentation\n• Hooks Guide\n• Performance Tips',
    timestamp: '10:31 AM',
  },
  {
    sender: 'user',
    text: "Thanks! That's helpful.",
    timestamp: '10:32 AM',
  },
];

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<MessageBubbleProps[]>(initialMessages);

  const handleSendMessage = (newMessage: string) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: newMessage, timestamp },
    ]);

    // (Optional) Simulate assistant reply after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: "I've received your message!",
          timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 2000);
  };

  const quickReplies = ['Tell me about hooks', 'Performance tips', 'State management'];

  const handleReplySelect = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <div className="chatContainer">
      <ChatHeader
        title="AI Chat Assistant"
        subtitle="Speech recognition enabled"
      />
      <ChatWindow messages={messages} />
      <QuickReplies replies={quickReplies} onReplySelect={handleReplySelect} />
      <ChatInput
        onSendMessage={handleSendMessage}
        onVoiceClick={() => console.log('Voice input clicked')}
      />
    </div>
  );
};

export default ChatApp;
