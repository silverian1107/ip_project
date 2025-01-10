import { ReviewClient } from './client';

export const ReviewEndpoints = {
  async review(data) {
    return (await ReviewClient.auth().post('', data)).data;
  },

  async getReviewByUser() {
    return (await ReviewClient.auth().get('')).data;
  }
};
