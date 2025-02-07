import React from 'react';
import  './QuickReplies.css';

interface QuickRepliesProps {
  replies: string[];
  onReplySelect: (reply: string) => void;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ replies, onReplySelect }) => {
  return (
    <div className="quickRepliesContainer">
      {replies.map((reply, idx) => (
        <button
          key={idx}
          className="replyButton"
          onClick={() => onReplySelect(reply)}
        >
          {reply}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
