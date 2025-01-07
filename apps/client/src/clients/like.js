import { LikeClient } from './client';

export const LikeEndpoints = {
  toggleLike: async (dramaId) => {
    return (await LikeClient.auth().post(`drama/${dramaId}`)).data;
  }
};
