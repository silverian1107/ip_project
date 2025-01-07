import { useMutation } from '@tanstack/react-query';
import { ReviewEndpoints } from '../../clients/review';
import { toast } from 'sonner';

export const useReview = () => {
  return useMutation({
    mutationKey: ['review'],
    mutationFn: async (data) => {
      return await ReviewEndpoints.review(data);
    },
    onSuccess: () => {
      toast.success('Review added successfully!');
    }
  });
};
