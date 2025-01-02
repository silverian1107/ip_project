import axios from 'axios';
import { toast } from 'sonner';

const unauthClient = axios.create({
  baseURL: `${process.env.REACT_APP_API}/auth`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

unauthClient.interceptors.response.use(
  (response) => {
    console.log('response', response);

    return response;
  },
  (error) => {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.statusText ||
      'An unexpected error occurred';

    toast.error(errorMessage);

    return Promise.reject();
  }
);

export default unauthClient;
