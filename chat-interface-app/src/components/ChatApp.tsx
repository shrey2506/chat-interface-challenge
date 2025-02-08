// src/components/ChatApp/ChatApp.tsx

import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatWindow from './ChatWindow/ChatWindow';
import QuickReplies from './QuickReplies/QuickReplies';
import ChatInput from './ChatInput/ChatInput';
import SettingsPanel from './SettingsPanel/SettingsPanel';
import { useChatSettings } from '../context/ChatSettingContext';
import { Message, fetchMessages, sendMessage } from '../services/ChatService';

const POLL_INTERVAL = 2000; // 2 seconds for demonstration

const ChatApp: React.FC = () => {
  const { theme } = useChatSettings(); 
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Initial load
    loadMessages();
    
    // Polling for real-time updates
    const intervalId = setInterval(() => {
      loadMessages(true); // silent load
    }, POLL_INTERVAL);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, []);

  async function loadMessages(isSilent?: boolean) {
    if (!isSilent) setLoading(true);
    try {
      const data = await fetchMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch messages.');
    } finally {
      if (!isSilent) setLoading(false);
    }
  }

  // Handles user-sent messages
  const handleSendMessage = async (text: string, isVoiceMessage?: boolean) => {
    setError('');
    const newMessage: Omit<Message, 'id' | 'timestamp'> = {
      sender: 'user',
      text,
      isVoiceMessage,
    };
    try {
      // Optimistically update local state
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [...prev, { ...newMessage, timestamp }]);
      
      // Send to server
      await sendMessage(newMessage);

      // Optionally, the server might respond with an assistant message
      // after a short delay. Or we rely on polling to fetch new messages.
    } catch (err) {
      console.error(err);
      setError('Failed to send message.');
    }
  };

  // Quick reply suggestions
  const quickReplies = ['What are React hooks?', 'Show me performance tips', 'Discuss state management'];

  return (
    <div
      data-theme={theme}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        maxWidth: 600,
        margin: '0 auto',
        backgroundColor: theme === 'light' ? '#f7f7f7' : '#222',
        color: theme === 'light' ? '#000' : '#eee',
      }}
    >
      <ChatHeader
        title="AI Chat Assistant"
        subtitle="Speech recognition enabled"
        onSettingsClick={() => setShowSettings(true)}
      />
      <ChatWindow messages={messages} loading={loading} error={error} />
      <QuickReplies replies={quickReplies} onReplySelect={handleSendMessage} />
      <ChatInput onSendMessage={handleSendMessage} />

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
    </div>
  );
};

export default ChatApp;
