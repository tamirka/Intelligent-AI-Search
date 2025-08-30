import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { GroundingChunk } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchWeb = async (query: string): Promise<{ text: string, citations: GroundingChunk[] }> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Answer the following query based on a comprehensive web search: "${query}"`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    // Filter out any potential empty or invalid chunks
    const validCitations = groundingChunks.filter(chunk => (chunk.web && chunk.web.uri) || (chunk.retrievedContext && chunk.retrievedContext.uri));

    return { text, citations: validCitations };
  } catch (error) {
    console.error("Error during web search:", error);
    throw new Error("Failed to fetch response from Gemini API.");
  }
};


export const searchDocument = async (documentText: string, query: string): Promise<string> => {
  if (!documentText.trim()) {
    throw new Error("Document content cannot be empty.");
  }
  if (!query.trim()) {
    throw new Error("Query cannot be empty.");
  }

  const prompt = `
    Based *only* on the information provided in the following document, please provide a concise and accurate answer to the user's query. Do not use any external knowledge. If the answer cannot be found in the document, state that clearly.

    --- DOCUMENT START ---
    ${documentText}
    --- DOCUMENT END ---

    User Query: "${query}"
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error during document search:", error);
    throw new Error("Failed to fetch response from Gemini API.");
  }
};
