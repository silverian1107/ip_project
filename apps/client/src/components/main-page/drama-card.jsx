import { Heart } from 'lucide-react';
import React, { useState } from 'react';
import { IMG_BASE_URL } from '../MainPage';
import { useTranslation } from 'react-i18next';

export default function DramaCard({ drama, onClickDramaItem, onLike }) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer"
      onClick={() => onClickDramaItem(drama)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={IMG_BASE_URL + drama.posterPath}
        alt={drama.name}
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent">
        <div
          className={`transition-transform duration-300 ease-in-out ${
            isHovered ? 'translate-y-0' : 'translate-y-[70%]'
          }`}
        >
          <h4 className="mb-2 text-lg font-semibold text-white line-clamp-2">
            {drama.titleTranslations[currentLanguage]}
          </h4>
          <div
            className={`space-y-2 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-sm text-white line-clamp-3">
              {drama.overviewTranslations[currentLanguage]}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-yellow-400">
                ★ {drama.voteAverage.toFixed(1)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(drama.id);
                }}
                className="flex items-center text-white transition-colors hover:text-blue-600"
              >
                <Heart className="w-4 h-4 mr-1" />
                <span>{drama.likeCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
