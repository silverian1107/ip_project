import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePopularDramas } from '../hooks/queries/use-drama';
import LoadingSpinner from './ui/spinner';
import DramaSlider from './main-page/drama-slider';
import DramaRankings from './main-page/drama-ranking';
import DramaList from './main-page/drama-list';

export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w1280/';
const API_KEY = 'd935fbb42d754c0a19e3c947ea1e3a93';
const BASE_URL = 'https://api.themoviedb.org/3';

export default function MainPage() {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [dramas, setDramas] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const { data: popular, isLoading } = usePopularDramas();

  useEffect(() => {
    const handleLanguageChange = (lang) => {
      setCurrentLanguage(lang);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const fetchKoreanDramas = async (pageNum) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}` +
          `&with_original_language=ko` +
          `&language=ko-KR` +
          `&with_genres=18` +
          `&sort_by=popularity.desc` +
          `&page=${pageNum}`
      );
      const data = await response.json();

      if (data && Array.isArray(data.results)) {
        setDramas((prev) =>
          pageNum === 1 ? data.results : [...prev, ...data.results]
        );
        if (data.page >= data.total_pages) setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching dramas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKoreanDramas(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(currentLanguage);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        if (!loading && hasMore) {
          setPage((prev) => prev + 1);
          fetchKoreanDramas(page + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, loading, hasMore]);

  const onClickDramaItem = (drama) => {
    navigate(`/drama/${drama.name}`, { state: drama });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      <DramaSlider dramas={popular} currentLanguage={currentLanguage} />
      <DramaRankings dramas={popular} onClickDramaItem={onClickDramaItem} />
      <DramaList dramas={dramas} onClickDramaItem={onClickDramaItem} />
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
}
