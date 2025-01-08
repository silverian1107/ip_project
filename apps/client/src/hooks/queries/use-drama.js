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

export const useDrama = (id) => {
  return useQuery({
    queryKey: ['drama', id],
    queryFn: async () => {
      const response = await DramaEndpoints.getDrama(id);
      return response;
    }
  });
};

export const useIsLikedDrama = (dramaId) => {
  return useQuery({
    queryKey: ['is-liked-drama', dramaId],
    queryFn: async () => {
      const response = await DramaEndpoints.isLiked(dramaId);
      return response;
    }
  });
};

export const useIsBookmarkedDrama = (dramaId) => {
  return useQuery({
    queryKey: ['is-bookmarked-drama', dramaId],
    queryFn: async () => {
      const response = await DramaEndpoints.isBookmarked(dramaId);
      return response;
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
