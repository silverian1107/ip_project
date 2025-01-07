import { ReviewClient } from './client';

export const ReviewEndpoints = {
  async review(data) {
    return (await ReviewClient.auth().post('', data)).data;
  }
};
