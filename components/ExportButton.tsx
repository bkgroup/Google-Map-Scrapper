
import React from 'react';
import { type BusinessListing } from '../types';
import { exportToCsv } from '../utils/csvExporter';

interface ExportButtonProps {
  data: BusinessListing[];
  filename: string;
}

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);


const ExportButton: React.FC<ExportButtonProps> = ({ data, filename }) => {
  const handleExport = () => {
    exportToCsv(data, filename);
  };

  return (
    <button
      onClick={handleExport}
      disabled={data.length === 0}
      className="inline-flex items-center px-4 py-2 bg-brand-green text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
    >
      <DownloadIcon />
      Export to CSV
    </button>
  );
};

export default ExportButton;
