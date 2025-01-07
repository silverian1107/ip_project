import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDrama } from '../hooks/queries/use-drama';
import { useTranslation } from 'react-i18next';
import '../styles/Detail.css';
import TrailerBanner from '../components/detail/TrailerBanner';
import OTTSection from '../components/detail/OTTSection';
import DramaInfo from '../components/detail/DramaInfo';
import CastSection from '../components/detail/CastSection';
import HighlightsSection from '../components/detail/HighlightsSection';
import ReviewsSection from '../components/detail/ReviewsSection';
import TitleSection from '../components/detail/TitleSection';

const API_KEY = 'd935fbb42d754c0a19e3c947ea1e3a93';
const BASE_URL = 'https://api.themoviedb.org/3';

export default function Detail() {
  const param = useParams();
  const { data: drama, isLoading, isError } = useDrama(param.id);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [details, setDetails] = useState(null);
  const [trailer, setTrailer] = useState('');
  const [highlights, setHighlights] = useState([]);
  const [cast, setCast] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [crew, setCrew] = useState([]);
  const [ottProviders, setOTTProviders] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const fetchOTTProviders = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/tv/${id}/watch/providers`, {
        params: { api_key: API_KEY }
      });

      const providers = response.data.results.KR;
      if (providers && providers.flatrate) {
        setOTTProviders(providers.flatrate);
      } else {
        setOTTProviders([]);
      }
    } catch (error) {
      console.error('Error fetching OTT providers:', error);
      setOTTProviders([]);
    }
  };

  const fetchDetails = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/tv/${id}`, {
        params: { api_key: API_KEY, language: 'ko-KR' }
      });
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const fetchTrailer = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/tv/${id}/videos`, {
        params: { api_key: API_KEY, language: 'ko-KR' }
      });

      let trailerVideo = response.data.results.find(
        (video) =>
          (video.type === 'Trailer' || video.type === 'Teaser') &&
          video.iso_639_1 === 'ko'
      );

      if (!trailerVideo) {
        const fallbackResponse = await axios.get(
          `${BASE_URL}/tv/${id}/videos`,
          {
            params: { api_key: API_KEY, language: 'en-US' }
          }
        );
        trailerVideo = fallbackResponse.data.results.find(
          (video) => video.type === 'Trailer' || video.type === 'Teaser'
        );
      }

      if (trailerVideo) {
        setTrailer(trailerVideo.key);
      } else {
        setTrailer(null);
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  const fetchCastAndCrew = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/tv/${id}/credits`, {
        params: { api_key: API_KEY, language: 'ko-KR' }
      });
      setCast(response.data.cast);

      const filteredCrew = response.data.crew.filter(
        (member) =>
          member.job === 'Director' ||
          member.job === 'Executive Producer' ||
          member.job === 'Writer'
      );
      setCrew(filteredCrew);
    } catch (error) {
      console.error('Error fetching cast and crew:', error);
    }
  };

  const fetchHighlight = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/tv/${id}/videos`, {
        params: { api_key: API_KEY, language: 'ko-KR' }
      });

      let highlightVideos = response.data.results.filter(
        (video) =>
          (video.type === 'Clip' || video.type === 'Featurette') &&
          video.iso_639_1 === 'ko'
      );

      if (highlightVideos.length === 0) {
        const fallbackResponse = await axios.get(
          `${BASE_URL}/tv/${id}/videos`,
          {
            params: { api_key: API_KEY, language: 'en-US' }
          }
        );
        highlightVideos = fallbackResponse.data.results.filter(
          (video) => video.type === 'Clip' || video.type === 'Featurette'
        );
      }

      setHighlights(highlightVideos);
    } catch (error) {
      console.error('Error fetching highlights:', error);
    }
  };

  const fetchAllData = async () => {
    await fetchDetails(drama.tmdbId);
    await fetchTrailer(drama.tmdbId);
    await fetchHighlight(drama.tmdbId);
    await fetchCastAndCrew(drama.tmdbId);
  };

  useEffect(() => {
    if (!drama?.tmdbId) return;

    fetchAllData();
    fetchOTTProviders(drama.tmdbId);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drama?.tmdbId]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading drama details</div>;

  return (
    <div className="page-container">
      <TitleSection
        dramaId={drama.id}
        title={drama.titleTranslations[currentLanguage]}
      />
      <TrailerBanner
        trailer={trailer}
        drama={drama}
        details={details}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        currentLanguage={currentLanguage}
      />

      <OTTSection ottProviders={ottProviders} />

      <div className="toggle-info-section">
        <span className="toggle-info-text">Drama Information</span>
        <button
          className="toggle-info-button"
          onClick={() => setShowInfo(!showInfo)}
          aria-label={showInfo ? 'Close Info' : 'Open Info'}
        >
          {showInfo ? '△' : '▽'}
        </button>
      </div>

      {showInfo && details && (
        <DramaInfo
          details={details}
          drama={drama}
          currentLanguage={currentLanguage}
          crew={crew}
        />
      )}

      <CastSection cast={cast} />

      <HighlightsSection highlights={highlights} />

      <ReviewsSection id={drama.id} reviews={drama.reviews} />
    </div>
  );
}
