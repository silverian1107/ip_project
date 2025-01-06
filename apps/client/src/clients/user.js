import { UserClient } from './client';

export const UserEndpoints = {
  async getProfile() {
    return (await UserClient.auth().get('/profile/me')).data;
  }
};
