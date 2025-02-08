import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

interface ChatSettings {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  speechEnabled: boolean;
  setSpeechEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatSettingsContext = createContext<ChatSettings | undefined>(undefined);

export const ChatSettingsProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);

  return (
    <ChatSettingsContext.Provider value={{ theme, setTheme, speechEnabled, setSpeechEnabled }}>
      {children}
    </ChatSettingsContext.Provider>
  );
};

export const useChatSettings = () => {
  const context = useContext(ChatSettingsContext);
  if (!context) {
    throw new Error('useChatSettings must be used within a ChatSettingsProvider');
  }
  return context;
};
