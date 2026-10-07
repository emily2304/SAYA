// src/models/chat.model.ts
export interface ChatRequest {
    prompt: string;
    provider?: "openai" | "deepseek";
  }
  
  export interface ChatResponse {
    response: string;
  }