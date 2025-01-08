import { useMutation } from '@tanstack/react-query';
import { BookmarkEndpoints } from '../../clients/bookmark';
import { toast } from 'sonner';

export const useToggleBookmark = () => {
  return useMutation({
    mutationKey: ['bookmark'],
    mutationFn: async (dramaId) => {
      return await BookmarkEndpoints.toggleBookmark(dramaId);
    },
    onSuccess: (data) => {
      if (data === 'Bookmark added') {
        toast.success('Bookmarked!');
      } else {
        toast.success('Unbookmarked!');
      }
    }
  });
};
