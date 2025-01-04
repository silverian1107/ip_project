import { useQuery } from '@tanstack/react-query';
import { UserEndpoints } from '../../clients/user';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await UserEndpoints.getProfile();
      return response;
    }
  });
};
