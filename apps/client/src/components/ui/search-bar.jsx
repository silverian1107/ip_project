import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = ({ variant = 'header' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    if (variant === 'search-page') {
      const queryParam = searchParams.get('search') || '';
      setSearch(queryParam);
    }
  }, [searchParams, variant]);

  const handleSearch = (value) => {
    const trimmedValue = value.trim();
    if (variant === 'header') {
      if (trimmedValue.length > 0) {
        navigate(`/search?search=${encodeURIComponent(trimmedValue)}`);
      }
    } else {
      if (trimmedValue.length > 0) {
        setSearchParams({ search: trimmedValue });
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

    if (variant === 'search-page') {
      handleSearch(newValue);
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
