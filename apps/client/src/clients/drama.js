import { DramaClient } from './client';

export const DramaEndpoints = {
  getPopular: async () => {
    return (await DramaClient.unauth().get('/popular')).data;
  }
};
