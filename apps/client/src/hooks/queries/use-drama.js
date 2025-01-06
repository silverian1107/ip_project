import { useQuery } from '@tanstack/react-query';
import { DramaEndpoints } from '../../clients/drama';

export const usePopularDramas = () => {
  return useQuery({
    queryKey: ['popular-dramas'],
    queryFn: async () => {
      const response = await DramaEndpoints.getPopular();
      return response;
    }
  });
};
