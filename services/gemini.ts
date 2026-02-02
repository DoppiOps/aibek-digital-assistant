
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { Message, AibekConfig } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;
  private chatInstance: Chat | null = null;

  constructor() {
    const apiKey = process.env.API_KEY || "";
    this.ai = new GoogleGenAI({ apiKey });
  }

  async startChat(config: AibekConfig, history: Message[]) {
    const formattedHistory = history.map(m => ({
      role: m.role === 'user' ? 'user' : 'model' as any,
      parts: [{ text: m.content }]
    }));

    this.chatInstance = this.ai.chats.create({
      model: config.model,
      config: {
        systemInstruction: config.systemInstruction,
        temperature: config.temperature,
      },
      // Note: history in SDK is usually passed in constructor or manually managed
    });
    
    // If there is existing history, we'd typically need to 'feed' it or handle it in the state.
    // For simplicity in this OSS template, we'll maintain state in React.
    return this.chatInstance;
  }

  async sendMessage(message: string, config: AibekConfig): Promise<string> {
    try {
      // Re-initialize to ensure latest config/key
      const response = await this.ai.models.generateContent({
        model: config.model,
        contents: [{ role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: config.systemInstruction,
          temperature: config.temperature,
          thinkingConfig: { thinkingBudget: config.model.includes('pro') ? 16000 : 0 }
        }
      });

      return response.text || "Uzr, javob qaytarishda xatolik yuz berdi.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return `Xatolik yuz berdi: ${error instanceof Error ? error.message : 'Noma\'lum xato'}`;
    }
  }

  async sendMessageStream(message: string, config: AibekConfig, onChunk: (text: string) => void) {
    try {
      const responseStream = await this.ai.models.generateContentStream({
        model: config.model,
        contents: [{ role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: config.systemInstruction,
          temperature: config.temperature,
        }
      });

      let fullText = "";
      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          fullText += text;
          onChunk(fullText);
        }
      }
      return fullText;
    } catch (error) {
      console.error("Streaming error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
