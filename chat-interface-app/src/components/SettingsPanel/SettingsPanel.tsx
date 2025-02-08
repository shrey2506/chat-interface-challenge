// src/components/SettingsPanel/SettingsPanel.tsx

import React from 'react';
import { useChatSettings } from '../../context/ChatSettingContext';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const { theme, setTheme, speechEnabled, setSpeechEnabled } = useChatSettings();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.panel}>
        <h3>Settings</h3>
        <div style={styles.settingRow}>
          <label>Dark Mode</label>
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
        </div>
        <div style={styles.settingRow}>
          <label>Speech Recognition</label>
          <input
            type="checkbox"
            checked={speechEnabled}
            onChange={toggleSpeech}
          />
        </div>
        <button style={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: 8,
    minWidth: '300px',
  },
  settingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },
  closeBtn: {
    marginTop: '1rem',
    backgroundColor: '#4285f4',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
};

export default SettingsPanel;
