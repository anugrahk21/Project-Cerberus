/*
Project Cerberus: The AI Iron Dome
Version: 2.0
----------------------------------
Author: Anugrah K.
Role: Frontend Architecture & UI/UX
Description: API Client - Handles communication with the FastAPI backend.
             Includes type definitions for chat responses and error handling.
Note: Built for AI Cybersecurity Research Portfolio.
*/

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ChatResponse {
  success: boolean;
  response: string;
  security_check: string;
  verdict: {
    literal: "safe" | "unsafe" | "error";
    intent: "safe" | "unsafe" | "error";
    canary: "safe" | "unsafe" | "error";
  };
}

export interface ChatError {
  detail: {
    error: string;
    message: string;
    retry_after?: number;
    verdict?: {
      literal: "safe" | "unsafe" | "error";
      intent: "safe" | "unsafe" | "error";
      canary: "safe" | "unsafe" | "error";
    };
  };
}

export const sendChat = async (prompt: string) => {
  try {
    const response = await api.post<ChatResponse>('/chat', { prompt });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data as ChatError;
    }
    throw error;
  }
};

export const resetSession = async () => {
  const response = await api.post('/session/reset');
  return response.data;
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/');
    return response.data.status === 'online';
  } catch (error) {
    return false;
  }
};

export default api;
