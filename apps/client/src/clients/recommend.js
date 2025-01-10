import { RecommendationClient } from './client';

export const RecommendEndpoints = {
  getRecommendDramas: async () => {
    return (await RecommendationClient.auth().get('')).data;
  }
};
