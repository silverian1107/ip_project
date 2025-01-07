import { DramaClient } from './client';

export const DramaEndpoints = {
  getDramas: async (page) => {
    return DramaClient.unauth().get('', { params: { page, limit: 50 } });
  },

  getPopular: async () => {
    return (await DramaClient.unauth().get('/popular')).data;
  },

  getNewest: async () => {
    return (await DramaClient.unauth().get('/newest')).data;
  }
};
