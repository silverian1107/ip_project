import { Bookmark, Heart } from 'lucide-react';
import { useState } from 'react';
import { useIsLikedDrama } from '../../hooks/queries/use-drama';
import { useToggleLike } from '../../hooks/queries/use-like';
import { cn } from '../../libs/utils';

export default function TitleSection({ title, dramaId }) {
  const { data, isLoading: isLikedLoading } = useIsLikedDrama(dramaId);
  const toggleLike = useToggleLike();

  const [isLiked, setIsLiked] = useState(data);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    await toggleLike.mutateAsync(dramaId);
  };

  return (
    <div className="p-6 rounded-lg shadow-md title-section bg-background">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-100 to-blue-400 bg-clip-text">
          {title}
        </h1>
        <div className="flex space-x-2">
          {isLikedLoading && <span>Loading...</span>}
          {!isLikedLoading && (
            <button
              onClick={() => handleLike()}
              className={cn(
                'p-1.5 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-150 group',
                isLiked && 'hover:bg-red-600'
              )}
            >
              <Heart
                className={cn(
                  `w-6 h-6 text-blue-600`,
                  isLiked &&
                    'text-red-600 fill-red-600 group-hover:fill-white group-hover:text-white'
                )}
              />
            </button>
          )}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-1.5 rounded-full text-amber-500 hover:bg-amber-500 hover:text-white"
          >
            <Bookmark
              className={`w-6 h-6 ${isBookmarked ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
