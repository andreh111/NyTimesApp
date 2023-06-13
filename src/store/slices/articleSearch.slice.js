import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {createEntityAdapter} from '@reduxjs/toolkit';

import {API_KEY} from '../../config';

const articlesAdapter = createEntityAdapter({
  selectId: item => item.abstract,
});

const articlesSelector = articlesAdapter.getSelectors();

export const articleSearchApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
  }),
  tagTypes: ['articlesSearch'],
  reducerPath: 'api/articleSearch',
  endpoints: builder => ({
    getSearchArticles: builder.query({
      query: ({search, page}) => `?q=${search}&page=${page}&api-key=${API_KEY}`,
      transformResponse: response => {
        return articlesAdapter.addMany(
          articlesAdapter.getInitialState(),
          response?.response?.docs,
        );
      },
      forceRefetch: ({currentArg, previousArg}) => {
        return currentArg?.page !== previousArg?.page;
      },
      serializeQueryArgs: ({endpointName, queryArgs}) => {
        return `${endpointName}-${queryArgs?.term}`;
      },
      merge: (currentState, incomingState) => {
        articlesAdapter.addMany(
          currentState,
          articlesSelector.selectAll(incomingState),
        );
      },
    }),
  }),
});

export {articlesAdapter, articlesSelector};

export const {useGetSearchArticlesQuery} = articleSearchApi;
