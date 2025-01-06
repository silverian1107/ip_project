import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ThumbsUp, Play } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { IMG_BASE_URL } from '../MainPage';
import { cn } from '../../libs/utils';

export default function DramaRankings({ dramas, onClickDramaItem }) {
  const { t, i18n } = useTranslation('main-page');
  const currentLanguage = i18n.language;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="w-11/12 mx-auto space-y-4 md:w-4/5">
      <h2 className="text-2xl font-bold text-white">{t('popular')}</h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        navigation
        modules={[Navigation]}
        loop
        className="swiper-container"
        breakpoints={{
          639: {
            slidesPerView: 3
          },
          1280: {
            slidesPerView: 5
          }
        }}
      >
        {dramas.map((item, index) => (
          <SwiperSlide key={item.id}>
            <div
              className="relative cursor-pointer rank-container group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span
                className={cn(
                  'absolute top-0 left-0 z-10 px-2 py-1 text-gray-200 rank-number bg-gray-800/60',
                  index === 0 && 'bg-blue-600',
                  index === 1 && 'bg-amber-500'
                )}
              >
                {index + 1}
              </span>
              <div className="overflow-hidden aspect-[2/3]">
                <img
                  src={IMG_BASE_URL + item.posterPath}
                  alt={item.name}
                  className="object-cover w-full h-full transition-all duration-300 transform group-hover:scale-110 group-hover:brightness-50"
                />
              </div>
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-b from-white/5 to-black"
                  >
                    <h4 className="mb-2 text-lg font-bold text-white truncate">
                      {item.titleTranslations[currentLanguage]}
                    </h4>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-2 text-white">
                        <ThumbsUp className="size-4" />
                        {item.voteAverage.toFixed(1)}
                      </div>
                      <button
                        className="flex items-center gap-2 px-4 py-1 text-black transition-colors bg-white rounded-md hover:bg-opacity-80"
                        onClick={(e) => {
                          e.stopPropagation();
                          onClickDramaItem(item);
                        }}
                      >
                        <Play className="size-4" />
                        Go to
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-3">
                      {item.overviewTranslations[currentLanguage]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
