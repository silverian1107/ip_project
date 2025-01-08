import { SearchClient } from './client';

export const SearchEndpoint = {
  getSearch: async (queryParams) => {
    return (await SearchClient.unauth().get('', { params: queryParams })).data;
  }
};
