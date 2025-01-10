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
  },

  getDetail: async (id) => {
    return (await DramaClient.unauth().get(`/${id}`)).data;
  },

  getDrama: async (id) => {
    return (await DramaClient.unauth().get(`/${id}`)).data;
  },

  isLiked: async (id) => {
    return (await DramaClient.auth().get(`/isLiked/${id}`)).data;
  },

  isBookmarked: async (id) => {
    return (await DramaClient.auth().get(`/isBookmarked/${id}`)).data;
  },

  getBookmarked: async () => {
    return (await DramaClient.auth().get('/bookmarked')).data;
  }
};
