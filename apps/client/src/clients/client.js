import { createCustomClient } from './base';

const UserClient = {
  auth: () => {
    return createCustomClient('http://localhost:3001/api/users', true);
  },
  unauth: () => {
    return createCustomClient('http://localhost:3001/api/users', false);
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
