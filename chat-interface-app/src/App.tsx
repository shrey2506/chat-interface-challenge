import React from "react";
import './App.css';
import ChatApp from './components/ChatApp';
import { ChatSettingsProvider } from "./context/ChatSettingContext";

function App() {
  return (
    <div className="App">
      <ChatSettingsProvider>
         <ChatApp />
      </ChatSettingsProvider>
     
    </div>
  );
}

export default App;
