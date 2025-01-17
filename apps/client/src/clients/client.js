import { createCustomClient } from './base';

export const UserClient = {
  auth: () => {
    return createCustomClient('http://localhost:3001/api/users', true);
  },
  unauth: () => {
    return createCustomClient('http://localhost:3001/api/users', false);
  }
};

export const DramaClient = {
  auth: () => {
    return createCustomClient('http://localhost:3001/api/dramas', true);
  },
  unauth: () => {
    return createCustomClient('http://localhost:3001/api/dramas', false);
  }
};

export const ReviewClient = {
  auth: () => {
    return createCustomClient('http://localhost:3001/api/review', true);
  },
  unauth: () => {
    return createCustomClient('http://localhost:3001/api/review', false);
  }
};

export const LikeClient = {
  auth: () => {
    return createCustomClient('http://localhost:3001/api/likes', true);
  },
  unauth: () => {
    return createCustomClient('http://localhost:3001/api/likes', false);
  }
};

export const BookmarkClient = {
  auth: () => {
    return createCustomClient('http://localhost:3001/api/bookmark', true);
  },
  unauth: () => {
    return createCustomClient('http://localhost:3001/api/bookmark', false);
  }
};

export const SearchClient = {
  unauth: () => {
    return createCustomClient('http://localhost:3001/api/search', false);
  }
};

export const RecommendationClient = {
  auth: () => {
    return createCustomClient('http://localhost:3001/api/recommend', true);
  }
};
