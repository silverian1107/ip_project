import { createCustomClient } from './base';

const UserClient = {
  auth: () => {
    return createCustomClient('http://localhost:3001/api/auth', true);
  },
  unauth: () => {
    return createCustomClient('http://localhost:3001/api/auth', false);
  }
};

const DramaClient = {
  auth: () => {
    return createCustomClient('http://localhost:3001/api/dramas', true);
  },
  unauth: () => {
    return createCustomClient('http://localhost:3001/api/dramas', false);
  }
};

export { UserClient, DramaClient };
