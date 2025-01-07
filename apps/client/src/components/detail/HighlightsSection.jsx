import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import YouTube from 'react-youtube';
import 'swiper/css';
import 'swiper/css/navigation';

export default function HighlightsSection({ highlights }) {
  return (
    <div className="highlights-section">
      <h2>Highlights</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        className="highlights-swiper"
      >
        {highlights.map((video) => (
          <SwiperSlide key={video.key}>
            <div className="highlight-video">
              <YouTube
                videoId={video.key}
                opts={{
                  width: '100%',
                  height: '200',
                  playerVars: {
                    autoplay: 0
                  }
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
