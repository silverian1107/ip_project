import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { LikeEndpoints } from '../../clients/like';

export const useToggleLike = () => {
  return useMutation({
    mutationKey: ['like'],
    mutationFn: async (dramaId) => {
      return await LikeEndpoints.toggleLike(dramaId);
    },
    onSuccess: (data) => {
      if (data === 'Like added') {
        toast.success('Liked!');
      } else {
        toast.success('Unliked!');
      }
    }
  });
};
