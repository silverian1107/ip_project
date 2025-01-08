import { BookmarkClient } from './client';

export const BookmarkEndpoints = {
  toggleBookmark: async (dramaId) => {
    return (await BookmarkClient.auth().post(`${dramaId}`)).data;
  }
};
