import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthClient, UnauthClient } from '../../clients/base';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export const useAccount = () => {
  const [token, setToken] = useState(Cookies.get('access_token'));

  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = Cookies.get('access_token');
      if (currentToken !== token) {
        setToken(currentToken);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [token]);

  return useQuery({
    queryKey: ['account'],
    queryFn: async () => {
      const response = await AuthClient.get('/users/profile/me');
      return response.data;
    },
    enabled: !!token,
    retry: 1
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (data) => {
      return await UnauthClient.post('/login', data);
    },
    onSuccess: async (data) => {
      toast.success('Logged In');
      Cookies.set('access_token', data.data.access_token);
      navigate('/');

      await queryClient.invalidateQueries('account');
    }
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return async () => {
    Cookies.remove('access_token');
    await queryClient.invalidateQueries('account');
  };
};
