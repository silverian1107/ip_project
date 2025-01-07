import { useQuery } from '@tanstack/react-query';
import { UserEndpoints } from '../../clients/user';
import Cookie from 'js-cookie';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await UserEndpoints.getProfile();
      return response;
    },
    enabled: !!Cookie.get('access_token'),
    retry: 1
  });
};
