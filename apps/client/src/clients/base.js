import axios from 'axios';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

export const UnauthClient = axios.create({
  baseURL: `http://localhost:3001/api/auth`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

UnauthClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.statusText ||
      'An unexpected error occurred';

    toast.error(errorMessage);

    return Promise.reject();
  }
);

export const AuthClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

AuthClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

AuthClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const errorMessage =
      error.response?.data?.message ||
      error.response?.statusText ||
      'An unexpected error occurred';

    if (status === 401 || status === 403) {
      return Promise.reject(error);
    }

    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

export const createCustomClient = (customBaseURL, isAuth = true) => {
  const baseClient = isAuth ? AuthClient : UnauthClient;

  const customClient = axios.create({
    ...baseClient.defaults,
    baseURL: customBaseURL
  });

  baseClient.interceptors.request.forEach((interceptor) =>
    customClient.interceptors.request.use(
      interceptor.fulfilled,
      interceptor.rejected
    )
  );
  baseClient.interceptors.response.forEach((interceptor) =>
    customClient.interceptors.response.use(
      interceptor.fulfilled,
      interceptor.rejected
    )
  );

  return customClient;
};
