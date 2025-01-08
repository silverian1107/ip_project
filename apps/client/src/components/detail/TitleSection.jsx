import { Bookmark, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  useIsBookmarkedDrama,
  useIsLikedDrama
} from '../../hooks/queries/use-drama';
import { useToggleLike } from '../../hooks/queries/use-like';
import { cn } from '../../libs/utils';
import { useProfile } from '../../hooks/queries/use-user';
import { toast } from 'sonner';
import { useToggleBookmark } from '../../hooks/queries/use-bookmark';

export default function TitleSection({ title, dramaId }) {
  const { data: profile } = useProfile();
  const { data: isLikedFromServer, isLoading: isLikedLoading } =
    useIsLikedDrama(dramaId, {
      enabled: !!profile
    });
  const { data: isBookmarkedFromServer, isLoading: isBookmarkedLoading } =
    useIsBookmarkedDrama(dramaId, { enabled: !!profile });

  const toggleLike = useToggleLike();
  const toggleBookmark = useToggleBookmark();

  const [isLiked, setIsLiked] = useState(isLikedFromServer || false);
  const [isBookmarked, setIsBookmarked] = useState(
    isBookmarkedFromServer || false
  );

  useEffect(() => {
    if (isLikedFromServer !== undefined) {
      setIsLiked(isLikedFromServer);
    }
  }, [isLikedFromServer]);

  useEffect(() => {
    if (isBookmarkedFromServer !== undefined) {
      setIsBookmarked(isBookmarkedFromServer);
    }
  }, [isBookmarkedFromServer]);

  const handleLike = async () => {
    if (!profile) {
      toast.error('You must sign in before liking this drama.');
      return;
    }

    setIsLiked(!isLiked);
    await toggleLike.mutateAsync(dramaId);
  };

  const handleBookmark = async () => {
    if (!profile) {
      toast.error('You must sign in before bookmarking.');
      return;
    }

    setIsBookmarked(!isBookmarked);
    await toggleBookmark.mutateAsync(dramaId);
  };

  return (
    <div className="p-6 rounded-lg shadow-md title-section bg-background">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-br from-blue-100 to-blue-400 bg-clip-text">
          {title}
        </h1>
        <div className="flex space-x-2">
          {isLikedLoading && profile && <span>Loading...</span>}
          {!isLikedLoading && (
            <button
              onClick={handleLike}
              className={cn(
                'p-1.5 text-blue-600 rounded-full hover:bg-blue-600 transition-all duration-150 group',
                isLiked && 'hover:bg-red-600'
              )}
            >
              <Heart
                className={cn(
                  `w-6 h-6 text-blue-600 group-hover:text-white`,
                  isLiked &&
                    'text-red-600 fill-red-600 group-hover:fill-white group-hover:text-white'
                )}
              />
            </button>
          )}

          {isBookmarkedLoading && profile && <span>Loading...</span>}
          {!isBookmarkedLoading && (
            <button
              onClick={handleBookmark}
              className="p-1.5 rounded-full text-amber-500 hover:bg-amber-500 hover:text-white group"
            >
              <Bookmark
                className={cn(
                  'w-6 h-6 text-amber-500 ',
                  isBookmarked &&
                    'fill-amber-500 group-hover:text-white group-hover:fill-white'
                )}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
