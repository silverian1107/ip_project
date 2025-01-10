import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  useDramas,
  useNewestDrama,
  usePopularDramas
} from '../hooks/queries/use-drama';
import DramaList from './main-page/drama-list';
import DramaRankings from './main-page/drama-ranking';
import DramaSlider from './main-page/drama-slider';
import LoadingSpinner from './ui/spinner';
import { useRecommendation } from '../hooks/queries/use-recommendation';
import { useProfile } from '../hooks/queries/use-user';

export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w1280/';
export const IMG_BASE_URL_SM = 'https://image.tmdb.org/t/p/w500/';

export default function MainPage() {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation('main-page');
  const { data: profile } = useProfile();
  const currentLanguage = i18n.language;
  const navigate = useNavigate();

  const { data } = useRecommendation({ enabled: !!profile });

  const {
    data: dramaData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useDramas();
  const { data: popular, isLoading } = usePopularDramas();
  const { data: newest, isLoading: isLoadingNewest } = useNewestDrama();

  const onClickDramaItem = (drama) => {
    navigate(`/drama/${drama.name}`, { state: drama });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const allDramas = dramaData?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="space-y-4">
      <DramaSlider
        isLoading={isLoading}
        dramas={popular}
        currentLanguage={currentLanguage}
      />
      {data && data.length > 0 && (
        <DramaRankings
          title="For you"
          dramas={data}
          isLoading={isLoading}
          onClickDramaItem={onClickDramaItem}
        />
      )}
      <DramaRankings
        title="popular"
        dramas={popular}
        badge
        isLoading={isLoading}
        onClickDramaItem={onClickDramaItem}
      />
      <DramaRankings
        title="newest"
        dramas={newest}
        isLoading={isLoadingNewest}
        onClickDramaItem={onClickDramaItem}
      />
      <DramaList
        title={t('discover')}
        dramas={allDramas}
        onClickDramaItem={onClickDramaItem}
      />
      {isFetchingNextPage && <div className="loading">Loading...</div>}
    </div>
  );
}
