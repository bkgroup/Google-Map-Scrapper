import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ResultsTable from './components/ResultsTable';
import Loader from './components/Loader';
import ExportButton from './components/ExportButton';
import { type BusinessListing } from './types';
import { scrapeGoogleMaps } from './services/geminiService';
import Welcome from './components/Welcome';

const App: React.FC = () => {
  const [results, setResults] = useState<BusinessListing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = useCallback(async (query: string) => {
    if (!query) {
      setError("Please enter a search query.");
      return;
    }
    setSearchQuery(query);
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const data = await scrapeGoogleMaps(query);
      setResults(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLoadMore = useCallback(async () => {
    setIsMoreLoading(true);
    setError(null);
    try {
        const existingNames = results.map(r => r.name);
        const newData = await scrapeGoogleMaps(searchQuery, existingNames);
        setResults(prevResults => [...prevResults, ...newData]);
    } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "An unknown error occurred while fetching more data.");
    } finally {
        setIsMoreLoading(false);
    }
  }, [results, searchQuery]);


  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Start a New Search</h2>
          <p className="text-gray-500 mb-6">
            Enter a query like "restaurants in New York" or "dentists in surat" to get started. The AI will generate a sample list of businesses.
          </p>
          <SearchForm onSubmit={handleSearch} isLoading={isLoading} />
          
          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
              <p><span className="font-bold">Error:</span> {error}</p>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          {isLoading && <Loader />}
          
          {!isLoading && results.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
               <div className="p-6 flex justify-between items-center border-b border-gray-200 bg-gray-50">
                  <h3 className="text-xl font-bold text-gray-700">Scraping Results <span className="text-base font-normal text-gray-500">({results.length} found)</span></h3>
                  <ExportButton data={results} filename={`${searchQuery.replace(/\s+/g, '_')}_results.csv`} />
               </div>
               <ResultsTable data={results} />
               {!isLoading && results.length > 0 && (
                  <div className="p-6 text-center border-t border-gray-200 bg-gray-50/50">
                      <button
                          onClick={handleLoadMore}
                          disabled={isMoreLoading}
                          className="w-full sm:w-auto h-12 flex items-center justify-center px-8 py-2 bg-brand-blue/10 text-brand-blue font-semibold rounded-lg hover:bg-brand-blue/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300"
                      >
                          {isMoreLoading ? (
                              <>
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Scraping More...
                              </>
                          ) : (
                              'Scrape More Results'
                          )}
                      </button>
                  </div>
              )}
            </div>
          )}

          {!isLoading && !error && results.length === 0 && (
            <Welcome />
          )}
        </div>
      </main>
      <footer className="text-center p-4 text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Google Maps Scraper AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;