import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  const errorIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 flex-shrink-0">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-1.03-5.22a.75.75 0 0 1 1.06-1.06L10 11.94l2.22-2.22a.75.75 0 1 1 1.06 1.06L11.06 13l2.22 2.22a.75.75 0 1 1-1.06 1.06L10 14.06l-2.22 2.22a.75.75 0 0 1-1.06-1.06L8.94 13 6.72 10.78Z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center animate-fade-in" role="alert">
      {errorIcon}
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default ErrorMessage;
