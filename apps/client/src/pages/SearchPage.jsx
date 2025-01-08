import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchBar from '../components/ui/search-bar';
import { cn } from '../libs/utils';
import { useSearch } from '../hooks/queries/use-search';
import { IMG_BASE_URL } from '../components/MainPage';

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState('dramas');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get('search') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const { data, isLoading, isError } = useSearch({
    search: searchQuery,
    page: currentPage,
    limit: itemsPerPage
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (isError)
    return <p className="text-white">Error fetching search results</p>;

  const { persons, dramas } = data || {
    persons: { items: [], meta: { totalPages: 0 } },
    dramas: { items: [], meta: { totalPages: 0 } }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold text-white">Search</h1>
      <SearchBar variant="search-page" />
      <div className="mt-4">
        <div className="flex border-b">
          <button
            className={cn(
              `py-2 px-4 text-white hover:bg-gray-900/50`,
              activeTab === 'dramas' &&
                'border-b-2 border-blue-500 bg-blue-950/60'
            )}
            onClick={() => handleTabChange('dramas')}
          >
            Dramas
          </button>
          <button
            className={cn(
              `py-2 px-4 text-white hover:bg-gray-900/50`,
              activeTab === 'actors' &&
                'border-b-2 border-blue-500 bg-blue-950/60'
            )}
            onClick={() => handleTabChange('actors')}
          >
            Actors
          </button>
        </div>

        <div className="mt-4">
          {activeTab === 'dramas' ? (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dramas.items.map((drama) => (
                <li
                  key={drama.id}
                  className="p-4 transition-colors rounded-lg bg-gray-800/80 hover:bg-gray-700/80"
                >
                  <div
                    className="block cursor-pointer"
                    onClick={() => navigate(`/drama/${drama.id}`)}
                  >
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {drama.title}
                    </h3>
                    <p className="text-gray-300">
                      {drama.overview?.slice(0, 100)}...
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {persons.items.map((actor) => (
                <li
                  key={actor.id}
                  className="p-4 text-center transition-colors rounded-lg bg-gray-800/80 hover:bg-gray-700/80"
                >
                  <div
                    className="block cursor-pointer"
                    onClick={() => navigate(`/actor/${actor.tmdbId}`)}
                  >
                    <div className="w-24 h-24 mx-auto mb-2 overflow-hidden rounded-full">
                      <img
                        src={
                          `${IMG_BASE_URL}${actor.profilePath}` ||
                          '/placeholder.svg?height=96&width=96'
                        }
                        alt={actor.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      {actor.name}
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 text-white transition-colors bg-blue-500 rounded disabled:bg-gray-500 hover:bg-blue-600"
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of{' '}
            {activeTab === 'actors'
              ? persons.meta.totalPages
              : dramas.meta.totalPages}
          </span>
          <button
            disabled={
              currentPage ===
              (activeTab === 'actors'
                ? persons.meta.totalPages
                : dramas.meta.totalPages)
            }
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 text-white transition-colors bg-blue-500 rounded disabled:bg-gray-500 hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
