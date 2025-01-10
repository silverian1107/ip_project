import { useQuery } from '@tanstack/react-query';
import { RecommendEndpoints } from '../../clients/recommend';

export const useRecommendation = () => {
  return useQuery({
    queryKey: ['recommendation'],
    queryFn: async () => {
      const response = await RecommendEndpoints.getRecommendDramas();
      return response;
    }
  });
};
