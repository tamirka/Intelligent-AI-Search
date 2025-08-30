import React, { useState, useCallback } from 'react';
import { searchWeb } from '../services/geminiService';
import { GroundingChunk } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import CitationCard from './CitationCard';
import ResponseDisplay from './ResponseDisplay';

const WebSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [citations, setCitations] = useState<GroundingChunk[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setError('Please enter a search query.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResponse(null);
    setCitations([]);

    try {
      const result = await searchWeb(query);
      setResponse(result.text);
      setCitations(result.citations);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  const searchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSearch()}
          placeholder="Ask anything about the web..."
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200"
          disabled={isLoading}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-sm hover:bg-brand-dark transition-colors duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {isLoading ? <LoadingSpinner size="sm" /> : <>{searchIcon} <span className="ml-2 hidden sm:inline">Search</span></>}
        </button>
      </div>

      <div className="mt-6">
        {error && <ErrorMessage message={error} />}
        {isLoading && !response && (
            <div className="text-center p-8">
                <LoadingSpinner />
                <p className="mt-4 text-slate-500 animate-subtle-pulse">Searching the web for answers...</p>
            </div>
        )}
        {response && (
          <div className="animate-fade-in space-y-6">
            <ResponseDisplay text={response} />
            {citations.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-3 border-b pb-2">Sources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {citations.map((citation, index) => (
                    <CitationCard key={index} citation={citation} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WebSearch;
