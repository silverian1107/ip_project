import { motion } from 'framer-motion';
import { Heart, Play, ThumbsUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { cn } from '../../libs/utils';
import { IMG_BASE_URL_SM } from '../MainPage';
import LoadingSpinner from '../ui/spinner';

export default function DramaRankings({
  title,
  dramas,
  badge,
  onClickDramaItem,
  onLike,
  isLoading
}) {
  const { t, i18n } = useTranslation('main-page');
  const currentLanguage = i18n.language;

  if (isLoading) {
    return (
      <div className="w-11/12 mx-auto space-y-4 lg:w-4/5">
        <h2 className="text-2xl font-bold text-white">{t(title)}</h2>
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto space-y-4 lg:w-4/5">
      <h2 className="text-2xl font-bold text-white">{t(title)}</h2>
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
            <motion.div
              className="relative cursor-pointer aspect-[2/3] overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105 group"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              {badge && (
                <span
                  className={cn(
                    'absolute top-2 left-2 z-10 px-2 py-1 text-sm font-bold text-white rounded',
                    index === 0 && 'bg-blue-600',
                    index === 1 && 'bg-amber-500',
                    index > 1 && 'bg-gray-800/80'
                  )}
                >
                  {index + 1}
                </span>
              )}
              <img
                src={IMG_BASE_URL_SM + item.posterPath}
                alt={item.name}
                className="absolute inset-0 object-cover w-full h-full transition-all duration-300 transform group-hover:scale-110 group-hover:brightness-50"
              />
              <motion.div
                className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent"
                variants={{
                  rest: { y: '100%' },
                  hover: { y: 0 }
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.h4
                  className="mb-2 text-lg font-bold text-white line-clamp-2"
                  variants={{
                    rest: { opacity: 0 },
                    hover: { opacity: 1 }
                  }}
                >
                  {item.titleTranslations[currentLanguage]}
                </motion.h4>
                <motion.div
                  className="flex flex-col gap-2"
                  variants={{
                    rest: { opacity: 0 },
                    hover: { opacity: 1 }
                  }}
                >
                  <p className="text-sm text-gray-300 line-clamp-3">
                    {item.overviewTranslations[currentLanguage]}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="font-semibold">
                          {item.voteAverage.toFixed(1)}
                        </span>
                      </div>
                      <motion.button
                        className="flex items-center gap-1 text-white transition-colors hover:text-blue-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLike(item.id);
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Heart className="w-4 h-4" />
                        <span>{item.likeCount}</span>
                      </motion.button>
                    </div>
                    <motion.button
                      className="flex items-center gap-2 px-3 py-1 text-sm text-black transition-colors bg-white rounded-md hover:bg-opacity-80"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickDramaItem(item);
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Play className="w-3 h-3" />
                      Go to
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
