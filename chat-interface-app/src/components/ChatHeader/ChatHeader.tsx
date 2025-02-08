import React from 'react';
import { FiSettings } from 'react-icons/fi';

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  onSettingsClick: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, subtitle, onSettingsClick }) => {
  return (
    <header style={styles.header}>
      <div>
        <h2 style={styles.title}>{title}</h2>
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
      </div>
      <button style={styles.settingsBtn} onClick={onSettingsClick}>
        <FiSettings size={18} />
      </button>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: { margin: 0, fontSize: '1rem', fontWeight: 'bold' },
  subtitle: { margin: 0, fontSize: '0.8rem', color: '#666' },
  settingsBtn: {
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#666',
  },
};


export default ChatHeader;
