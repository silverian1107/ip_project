import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { DramaEndpoints } from '../../clients/drama';

export const useDramas = () => {
  return useInfiniteQuery({
    queryKey: ['dramas'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await DramaEndpoints.getDramas(pageParam);
      return response;
    },
    getNextPageParam: (lastPage) => {
      const { meta } = lastPage;
      if (meta.currentPage < meta.totalPages) {
        return meta.currentPage + 1;
      }
      return undefined;
    }
  });
};

export const usePopularDramas = () => {
  return useQuery({
    queryKey: ['popular-dramas'],
    queryFn: async () => {
      const response = await DramaEndpoints.getPopular();
      return response;
    }
  });
};

export const useNewestDrama = () => {
  return useQuery({
    queryKey: ['newest-drama'],
    queryFn: async () => {
      const response = await DramaEndpoints.getNewest();
      return response;
    }
  });
};