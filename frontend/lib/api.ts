import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
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

export default api;
