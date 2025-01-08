import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/ui/search-bar';
import { cn } from '../libs/utils';

// Mocked data
const mockedActors = [
  { id: 1, name: 'Tom Hanks' },
  { id: 2, name: 'Meryl Streep' },
  { id: 3, name: 'Leonardo DiCaprio' },
  { id: 4, name: 'Viola Davis' }
];

const mockedDramas = [
  { id: 1, title: 'Breaking Bad' },
  { id: 2, title: 'The Crown' },
  { id: 3, title: 'Stranger Things' },
  { id: 4, title: 'Game of Thrones' }
];

const SearchPage = () => {
  const [activeTab, setActiveTab] = React.useState('actors');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  const filteredActors = mockedActors.filter((actor) =>
    actor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDramas = mockedDramas.filter((drama) =>
    drama.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold text-white">Search</h1>
      <SearchBar variant="search-page" />
      <div className="mt-4">
        <div className="flex border-b">
          <button
            className={cn(
              `py-2 px-4 text-white hover:bg-gray-900/50`,
              activeTab === 'actors' &&
                'border-b-2 border-blue-500 bg-blue-950/60'
            )}
            onClick={() => setActiveTab('actors')}
          >
            Actors
          </button>
          <button
            className={cn(
              `py-2 px-4 text-white hover:bg-gray-900/50`,
              activeTab === 'dramas' &&
                'border-b-2 border-blue-500 bg-blue-950/60'
            )}
            onClick={() => setActiveTab('dramas')}
          >
            Dramas
          </button>
        </div>

        <div className="mt-4">
          {activeTab === 'actors' ? (
            <ul>
              {filteredActors.map((actor) => (
                <li key={actor.id} className="mb-2">
                  {actor.name}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {filteredDramas.map((drama) => (
                <li key={drama.id} className="mb-2">
                  {drama.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
