import { GoogleGenAI } from "@google/genai";

export function getGeminiClient() {
    const apiKey = process.env.GOOGLEGEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("Gemini API key is not configured.");
    }
    
    return new GoogleGenAI({
        apiKey,
    });
}