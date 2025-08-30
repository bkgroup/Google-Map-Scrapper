
import { type BusinessListing } from '../types';

const escapeCsvCell = (cell: any): string => {
  if (cell === null || cell === undefined) {
    return '';
  }
  const cellString = String(cell);
  // If the cell contains a comma, double quote, or newline, wrap it in double quotes.
  if (/[",\n]/.test(cellString)) {
    // Also, double up any existing double quotes.
    return `"${cellString.replace(/"/g, '""')}"`;
  }
  return cellString;
};

export const exportToCsv = (data: BusinessListing[], filename: string): void => {
  if (data.length === 0) {
    console.warn("No data to export.");
    return;
  }

  const headers: (keyof BusinessListing)[] = ['name', 'category', 'address', 'phone', 'website', 'rating', 'reviewCount'];
  
  const headerRow = headers.map(header => header.charAt(0).toUpperCase() + header.slice(1)).join(',');

  const rows = data.map(item => {
    return headers.map(header => escapeCsvCell(item[header])).join(',');
  });

  const csvContent = [headerRow, ...rows].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  if (link.href) {
    URL.revokeObjectURL(link.href);
  }
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
