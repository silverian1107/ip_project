import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAccount } from '../hooks/queries/use-auth';
import '../styles/Header.css';
import SearchBar from './ui/search-bar';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  const { t } = useTranslation('header');
  const { account, logout, isLoading, isError } = useAccount();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const i18n = useTranslation().i18n;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang.toLowerCase());
    setIsDropdownOpen(false);
  };

  return (
    <header className="z-50 flex items-center justify-between p-4 mx-auto overflow-visible text-white md:w-4/5">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-bold">
          Drama<span className="text-blue-500">Sphere</span>
        </Link>
        <Link to="/community" className="hover:text-blue-300">
          {t('community')}
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <SearchBar variant="header" />

        <div className="relative">
          <span
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            {i18n.language.toUpperCase()}
            <ChevronDown size={16} />
          </span>

          {isDropdownOpen && (
            <div className="absolute right-0 z-50 w-32 mt-2 text-black bg-white rounded-md shadow-lg">
              {['KR', 'EN', 'VN'].map((lang) => (
                <span
                  key={lang}
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang}
                </span>
              ))}
            </div>
          )}
        </div>

        {!isLoading && !isError && account ? (
          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleProfileDropdown}
            >
              <img
                src={account.avatarUrl || '/user.png'}
                alt="Avatar"
                className="w-8 h-8 mr-2 rounded-full"
              />
              <span>{account.username} ▼</span>
            </div>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 z-50 w-48 mt-2 text-black bg-white rounded-md shadow-lg">
                <Link
                  to="/mypage"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  {t('viewProfile')}
                </Link>
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                  onClick={() => {
                    logout();
                    toast.success('Logged out');
                    setIsProfileDropdownOpen(false);
                  }}
                >
                  {t('logout')}
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex hover:text-blue-300 w-[124px] text-right"
          >
            {t('login')}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
