import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthClient, UnauthClient } from '../../clients/base';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

export const useAccount = () => {
  return useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const response = await AuthClient.get('/auth/me');
      return response.data;
    },
    enabled: !!Cookies.get('access_token')
  });
};

export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (data) => {
      return await UnauthClient.post('/register', data);
    },
    onSuccess: () => {
      toast.success('Register new account successfully');
      navigate('/login');
    }
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (data) => {
      return await UnauthClient.post('/login', data);
    },
    onSuccess: (data) => {
      toast.success('Logged In');
      navigate('/');
      Cookies.set('access_token', data.data.access_token);
    }
  });
};
