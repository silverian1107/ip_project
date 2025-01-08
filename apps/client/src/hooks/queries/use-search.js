import { useQuery } from '@tanstack/react-query';
import { SearchEndpoint } from '../../clients/search';

export const useSearch = (queryParams) => {
  return useQuery({
    queryKey: ['search', queryParams],
    queryFn: async () => {
      const response = await SearchEndpoint.getSearch(queryParams);
      return response;
    },
    enabled: !!queryParams
  });
};
