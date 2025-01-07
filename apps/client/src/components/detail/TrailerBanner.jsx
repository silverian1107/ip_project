import React, { useRef } from 'react';
import YouTube from 'react-youtube';

export default function TrailerBanner({
  trailer,
  drama,
  details,
  isFavorite,
  toggleFavorite,
  currentLanguage
}) {
  const playerRef = useRef(null);

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
  };

  const handleTrailerClick = (event) => {
    if (event.target.closest('.favorite-button')) {
      return;
    }

    if (playerRef.current) {
      playerRef.current.playVideo();
      const iframe = playerRef.current.getIframe();
      iframe.requestFullscreen();
    }
  };

  const onStateChange = (event) => {
    if (event.data === 0) {
      console.log('Video ended.');
    }
  };

  if (!trailer) {
    return (
      <div
        className="trailer-placeholder"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${drama.backdropPath})`,
          backgroundSize: 'cover',
          height: '450px'
        }}
      ></div>
    );
  }

  return (
    <div className="trailer-banner" onClick={handleTrailerClick}>
      <YouTube
        videoId={trailer}
        className="trailer-video"
        opts={{
          width: '100%',
          height: '450px',
          playerVars: { autoplay: 1, mute: 1 }
        }}
        onReady={onPlayerReady}
        onStateChange={onStateChange}
      />
      <div className="overlay">
        <div className="title-info">
          <h1>{drama.titleTranslations[currentLanguage]}</h1>
          <p>
            <strong>☆</strong> {details.vote_average}
          </p>
          <p>
            <span
              onClick={toggleFavorite}
              className="favorite-button"
              style={{
                cursor: 'pointer',
                fontSize: '1.5rem',
                color: isFavorite ? 'white' : 'gray'
              }}
            >
              {isFavorite ? '⚑' : '⚐'}
            </span>
            <span style={{ marginLeft: '8px' }}>찜</span>
          </p>
        </div>
      </div>
    </div>
  );
}
