import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Header.css';
import { useAccount } from '../hooks/queries/use-auth';

function Header() {
  const { t, i18n } = useTranslation('header');
  const { data: account, isLoading, isError } = useAccount();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang.toLowerCase());
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };
  console.log(account);

  return (
    <div className="header">
      <div className="nav-left">
        <Link className="user-icon" to="/mypage" title={t('mypage')}>
          👤
        </Link>
        <Link className="community" to="/community">
          {t('community')}
        </Link>
      </div>

      <Link className="logo" to="/">
        Drama<span className="text-blue-400">Sphere</span>
      </Link>

      <div className="nav-right">
        <div className="relative language-selector">
          <span className="cursor-pointer language" onClick={toggleDropdown}>
            {i18n.language.toUpperCase()} ▼
          </span>

          {isDropdownOpen && (
            <div className="absolute right-0 w-32 mt-2 text-black bg-white rounded-md shadow-lg dropdown">
              {['KR', 'EN', 'VN'].map((lang) => (
                <span
                  key={lang}
                  className="block px-4 py-2 cursor-pointer dropdown-item hover:bg-gray-200"
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang}
                </span>
              ))}
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder={t('search')}
          className="px-4 py-2 text-black rounded-md search-bar"
        />

        {!isLoading && !isError && account ? (
          <div className="relative px-4 py-2 rounded-md hover:bg-gray-900">
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
              <div className="absolute right-0 w-48 mt-2 overflow-hidden text-black bg-white rounded-md shadow-lg">
                <Link
                  to="/edit-profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  {t('editProfile')}
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  {t('logout')}
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link className="navbarMenu" to="/login">
            {t('login')}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
