export enum SearchMode {
  Web = 'web',
  Document = 'document',
}

// FIX: Made uri and title optional to match the GroundingChunk type from the @google/genai SDK, which caused a type error in geminiService.ts.
export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
  retrievedContext?: {
    uri?: string;
    title?: string;
  };
}
