
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-blue"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg className="w-8 h-8 text-brand-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-700">Generating Results...</p>
      <p className="text-sm text-gray-500">The AI is working its magic. Please wait a moment.</p>
    </div>
  );
};

export default Loader;
