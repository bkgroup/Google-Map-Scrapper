
import React from 'react';
import { type BusinessListing } from '../types';

interface ResultsTableProps {
  data: BusinessListing[];
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const Rating: React.FC<{ value?: number }> = ({ value }) => {
    if (value === undefined || value === null) return <span className="text-gray-400 italic">N/A</span>;
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < Math.round(value)} />
            ))}
            <span className="ml-2 text-sm text-gray-600 font-medium">{value.toFixed(1)}</span>
        </div>
    );
};

const ResultsTable: React.FC<ResultsTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Address</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Rating</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-500">{item.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-normal max-w-xs">
                <div className="text-sm text-gray-800">{item.address}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {item.phone && <div className="text-sm text-gray-800">{item.phone}</div>}
                {item.website && (
                  <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-blue hover:text-blue-700 hover:underline truncate">
                    {item.website}
                  </a>
                )}
                 {!item.phone && !item.website && <span className="text-gray-400 italic text-sm">N/A</span>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                 <Rating value={item.rating} />
                 {item.reviewCount !== undefined && <div className="text-xs text-gray-500 mt-1">({item.reviewCount} reviews)</div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
