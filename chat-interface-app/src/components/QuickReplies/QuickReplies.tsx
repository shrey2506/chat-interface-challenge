// src/components/QuickReplies/QuickReplies.tsx

import React from 'react';

interface QuickRepliesProps {
  replies: string[];
  onReplySelect: (reply: string) => void;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ replies, onReplySelect }) => {
  return (
    <div style={styles.container}>
      {replies.map((reply, idx) => (
        <button key={idx} style={styles.button} onClick={() => onReplySelect(reply)}>
          {reply}
        </button>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#fff',
    flexWrap: 'wrap' as 'wrap',
  },
  button: {
    backgroundColor: '#f1f3f4',
    border: 'none',
    borderRadius: '16px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
};

export default QuickReplies;
