import React, { useState, useCallback } from 'react';
import { searchDocument } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import ResponseDisplay from './ResponseDisplay';

const DocumentSearch: React.FC = () => {
  const [documentText, setDocumentText] = useState('');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!documentText.trim() || !query.trim()) {
      setError('Please provide both a document and a query.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await searchDocument(documentText, query);
      setResponse(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [documentText, query]);

  const searchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <div>
        <label htmlFor="document-text" className="block text-sm font-medium text-slate-600 mb-1">
          Paste your Document or Knowledge Base Content
        </label>
        <textarea
          id="document-text"
          value={documentText}
          onChange={(e) => setDocumentText(e.target.value)}
          placeholder="Paste content here... (e.g., meeting notes, articles, reports)"
          className="w-full h-48 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 resize-y"
          disabled={isLoading}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSearch()}
          placeholder="Ask a question about the document..."
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200"
          disabled={isLoading}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading || !documentText.trim() || !query.trim()}
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-sm hover:bg-brand-dark transition-colors duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isLoading ? <LoadingSpinner size="sm" /> : <>{searchIcon} <span className="ml-2 hidden sm:inline">Analyze</span></>}
        </button>
      </div>
      
      <div className="pt-2">
        {error && <ErrorMessage message={error} />}
        {isLoading && (
            <div className="text-center p-8">
                <LoadingSpinner />
                <p className="mt-4 text-slate-500 animate-subtle-pulse">Analyzing document...</p>
            </div>
        )}
        {response && <ResponseDisplay text={response} />}
      </div>
    </div>
  );
};

export default DocumentSearch;
