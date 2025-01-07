import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IMG_BASE_URL } from '../MainPage';
import LoadingSpinner from '../ui/spinner';

export default function DramaSlider({ dramas, currentLanguage, isLoading }) {
  if (isLoading) {
    return (
      <div className="w-11/12 mx-auto space-y-4 lg:w-4/5">
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="main-image-slider">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        loop
        className="main-swiper-container relative w-full h-[70vh]"
      >
        {dramas.slice(0, 5).map((drama) => (
          <SwiperSlide key={drama.id} className="relative group">
            <img
              src={`${IMG_BASE_URL}${drama.backdropPath}`}
              alt={drama.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 flex items-end w-full p-8 transition-opacity duration-300 bg-opacity-50 opacity-0 bg-gradient-to-b to-black/80 from-transparent h-3/5 group-hover:opacity-100">
              <div className="text-white">
                <h2 className="mb-2 text-3xl font-bold">
                  {drama.titleTranslations[currentLanguage]}
                </h2>
                <p className="mb-2">{drama.description}</p>
                <div className="flex items-center mb-2">
                  <Star className="mr-1 text-yellow-400" />
                  <span>{drama.voteAverage.toFixed(1)}</span>
                </div>
                <p className="text-sm">{drama.genre}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
