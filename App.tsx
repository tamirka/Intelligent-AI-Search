import React, { useState } from 'react';
import { SearchMode } from './types';
import WebSearch from './components/WebSearch';
import DocumentSearch from './components/DocumentSearch';

const App: React.FC = () => {
  const [searchMode, setSearchMode] = useState<SearchMode>(SearchMode.Web);

  const headerIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-brand-primary">
      <path d="M11.25 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S16.635 2.25 11.25 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z" />
      <path d="M12.99 8.632a1.125 1.125 0 0 0-1.005-1.005l-3.75.563a1.125 1.125 0 0 0-.563 2.07l3.75.562a1.125 1.125 0 0 0 1.005-1.005l-3.75-.563.563-3.75a1.125 1.125 0 0 0-2.07-.563l-.562 3.75a1.125 1.125 0 0 0 1.005 1.005l3.75-.563a1.125 1.125 0 0 0 .563-2.07Z" />
      <path d="M14.03 14.3a1.125 1.125 0 0 0-1.005-1.005l-3.75.563a1.125 1.125 0 0 0-.563 2.07l3.75.562a1.125 1.125 0 0 0 1.005-1.005l-3.75-.563.563-3.75a1.125 1.125 0 0 0-2.07-.563l-.562 3.75a1.125 1.125 0 0 0 1.005 1.005l3.75-.563a1.125 1.125 0 0 0 .563-2.07Z" />
    </svg>
  );

  const webIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );

  const docIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            {headerIcon}
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
              Intelligent AI Search
            </h1>
          </div>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Your smart assistant for querying the web or your own documents. Powered by Gemini.
          </p>
        </header>

        <div className="bg-white p-2 rounded-xl shadow-md mb-6 sticky top-4 z-10">
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setSearchMode(SearchMode.Web)}
              className={`w-full flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                searchMode === SearchMode.Web
                  ? 'bg-brand-primary text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {webIcon}
              Web Search
            </button>
            <button
              onClick={() => setSearchMode(SearchMode.Document)}
              className={`w-full flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                searchMode === SearchMode.Document
                  ? 'bg-brand-primary text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {docIcon}
              Document Search
            </button>
          </div>
        </div>

        <div className="animate-fade-in">
          {searchMode === SearchMode.Web ? <WebSearch /> : <DocumentSearch />}
        </div>
      </main>
      <footer className="text-center mt-12 text-sm text-slate-400">
        <p>&copy; {new Date().getFullYear()} Intelligent AI Search. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
