import React from 'react';
import  './ChatHeader.css';
import { FiSettings } from 'react-icons/fi';

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
}

const ChatHeader = ({ title, subtitle }: ChatHeaderProps) => {
  return (
    <header className="header">
      <div className="leftSection">
        <h1 className="title">{title}</h1>
        {subtitle && <span className="subtitle">{subtitle}</span>}
      </div>
      <div className="rightSection">
        <FiSettings size={20} />
      </div>
    </header>
  );
};

export default ChatHeader;
