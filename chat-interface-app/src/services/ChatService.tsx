import axios from 'axios';

export interface Message {
  id?: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isVoiceMessage?: boolean;
}

const API_URL = 'http://localhost:3001/api'; // Adjust to your mock server

export async function fetchMessages(): Promise<Message[]> {
  const response = await axios.get(`${API_URL}/messages`);
  return response.data; // Expected to be an array of Message objects
}

export async function sendMessage(message: Omit<Message, 'id' | 'timestamp'>): Promise<Message> {
  // Example: server sets 'id' and 'timestamp'
  const response = await axios.post(`${API_URL}/messages`, message);
  return response.data;
}
