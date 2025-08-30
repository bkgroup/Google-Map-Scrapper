
import React from 'react';

const MapPinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 20l-4.95-6.05a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
             <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-green">
              <MapPinIcon className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Google Maps Scraper <span className="text-brand-blue">AI</span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
