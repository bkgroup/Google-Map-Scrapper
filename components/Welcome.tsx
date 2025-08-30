
import React from 'react';

const MapIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="200" height="200" viewBox="0 0 128 128" {...props}>
        <path fill="#e0e0e0" d="M0 0h128v128H0z"/>
        <path fill="#a5d6a7" d="M0 0h128v128H0z"/>
        <path d="M102.05 102.05c-2.43 2.43-5.23 4.14-8.28 5.43L63.32 87.03l12.18-12.19 26.55 27.21z" fill="#81c784"/>
        <path fill="#f5f5f5" d="M128 113.84V41.07l-25.95 25.95-26.55 27.21 21.06 19.61h31.44z"/>
        <path fill="#4285f4" d="M63.32 87.03l-22.1-22.1-41.22 38.91v13.06h12.83l50.49-47.78z"/>
        <path d="M41.22 64.93l-15.06-15.06L0 75.82v37.98l41.22-38.87z" fill="#1e88e5"/>
        <path fill="#f5f5f5" d="M41.22 64.93l22.1 22.1-12.18 12.19-22.1-22.11z"/>
        <path fill="#e0e0e0" d="M63.32 87.03l-12.18 12.19-12.18-12.19 12.18-12.19z"/>
        <path d="M82.16 28.16a18.66 18.66 0 1 0 0 37.32 18.66 18.66 0 0 0 0-37.32zm-1.89 27.99l-5.65 5.66-5.66-5.66a8 8 0 1 1 11.31-11.31l-5.65 5.65-5.66-5.65a8 8 0 1 1 11.31 11.31z" fill="#fff" opacity=".8"/>
        <path d="M86.3 42.06c2.42-2.19 2.65-5.91.56-8.4-2.09-2.5-5.6-2.9-8.03-.71-2.42 2.19-2.65 5.91-.56 8.4 2.1 2.5 5.6 2.91 8.03.71z" fill="#ea4335"/>
    </svg>
);


const Welcome: React.FC = () => {
    return (
        <div className="text-center bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-200">
            <div className="flex justify-center mb-6">
                <MapIllustration />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Ready to Discover?</h2>
            <p className="mt-2 text-gray-600 max-w-prose mx-auto">
                Use the search bar above to generate data. Your results will be displayed here in a clean, easy-to-read table. You can then export all generated data to a CSV file with a single click.
            </p>
        </div>
    );
};

export default Welcome;
