import React from 'react';
import {useRoute} from '@react-navigation/native';

import {useGetTopStoriesQuery} from '../store/slices/topStories.slice';
import ArticleListContainer from '../components/ArticleListContainer';

const TopStoriesScreen = () => {
  const {
    params: {category},
  } = useRoute();
  const {data} = useGetTopStoriesQuery(category);

  const topStories = data?.results ?? [];

  return <ArticleListContainer data={topStories} />;
};

export default TopStoriesScreen;
