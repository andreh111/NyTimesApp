import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {API_KEY} from '../../config';

export const topStoriesApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.nytimes.com/svc/topstories/v2/',
  }),
  tagTypes: ['topStories'],
  reducerPath: 'api/topStories',
  endpoints: builder => ({
    getTopStories: builder.query({
      query: category => `${category}.json?api-key=${API_KEY}`,
    }),
  }),
});

export const {useGetTopStoriesQuery} = topStoriesApi;
