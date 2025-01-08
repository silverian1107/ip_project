import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = ({ variant = 'header' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(searchParams.get('query') || '');

  // Sync search state with URL query parameter when on search page
  useEffect(() => {
    if (variant === 'search-page') {
      const queryParam = searchParams.get('query') || '';
      setSearch(queryParam);
    }
  }, [searchParams, variant]);

  const handleSearch = (value) => {
    const trimmedValue = value.trim();
    if (variant === 'header') {
      // In header: navigate to search page only if there's a value
      if (trimmedValue.length > 0) {
        navigate(`/search?query=${encodeURIComponent(trimmedValue)}`);
      }
    } else {
      // On search page: update URL params
      // If empty, remove the query parameter entirely
      if (trimmedValue.length > 0) {
        setSearchParams({ query: trimmedValue });
      } else {
        setSearchParams({});
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(search);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearch(newValue);

    // Auto-update search results only on search page
    if (variant === 'search-page') {
      handleSearch(newValue); // Remove the length check to handle empty state
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => handleSearch(search)}
        className="absolute p-1 text-gray-400 -translate-y-1/2 right-2 top-1/2 hover:text-gray-600"
      >
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
