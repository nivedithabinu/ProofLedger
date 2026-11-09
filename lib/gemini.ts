import { GoogleGenAI } from "@google/genai";

export function getGeminiClient() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("Gemini API key is not configured.");
    }
    
    return new GoogleGenAI({
        apiKey,
        httpOptions: {
            timeout: 120_000,
            retryOptions: {
                attempts: 2,
                initialDelay: 1,
                maxDelay: 2,
                expBase: 2,
                jitter: 0.2,
                httpStatusCodes: [408, 429, 500, 502, 503],
            },
        },
    });
}