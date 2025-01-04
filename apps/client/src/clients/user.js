import { UserClient } from './base';

export const UserEndpoints = {
  async getProfile() {
    return (await UserClient.get('/profile/me')).data;
  }
};
