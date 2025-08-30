import React from 'react';
import { GroundingChunk } from '../types';

interface CitationCardProps {
  citation: GroundingChunk;
}

const CitationCard: React.FC<CitationCardProps> = ({ citation }) => {
  const source = citation.web || citation.retrievedContext;

  if (!source || !source.uri) {
    return null;
  }
  
  const linkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1.5 flex-shrink-0">
      <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
      <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 0 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
    </svg>
  );

  return (
    <a
      href={source.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 bg-slate-50 hover:bg-brand-secondary border border-slate-200 rounded-lg transition-all duration-200 group"
    >
      <div className="font-semibold text-brand-primary group-hover:underline truncate text-sm">
        {source.title || 'Untitled Source'}
      </div>
      <div className="flex items-center text-slate-500 text-xs mt-1 truncate">
        {linkIcon}
        {source.uri}
      </div>
    </a>
  );
};

export default CitationCard;
