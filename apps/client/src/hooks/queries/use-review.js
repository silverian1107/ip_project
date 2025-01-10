import { useMutation, useQuery } from '@tanstack/react-query';
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

export const useReviewByUser = () => {
  return useQuery({
    queryKey: ['review-by-user'],
    queryFn: async () => {
      const response = await ReviewEndpoints.getReviewByUser();
      return response;
    }
  });
};
