import React, { useRef, useEffect } from 'react';
import { Message } from '../../services/ChatService';
import MessageBubble from '../MessageBubble/MessageBubble';

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
  error: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, loading, error }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Display loading / error states if needed
  if (loading) {
    return <div style={{ padding: '1rem', textAlign: 'center' }}>Loading messages...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', padding: '1rem', textAlign: 'center' }}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} />
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    overflowY: 'auto' as 'auto',
    padding: '1rem',
    backgroundColor: '#f7f7f7',
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
};

export default ChatWindow;
