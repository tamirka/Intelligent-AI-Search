import React from 'react';

interface ResponseDisplayProps {
  text: string;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ text }) => {
  return (
    <div className="bg-slate-50/70 p-4 rounded-lg border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-700 mb-2">AI Response</h3>
      <div className="prose prose-slate max-w-none prose-sm text-slate-600 whitespace-pre-wrap">
        {text}
      </div>
    </div>
  );
};

export default ResponseDisplay;
