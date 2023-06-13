import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';

import ArticleListContainer from '../components/ArticleListContainer';
import {
  articlesAdapter,
  articlesSelector,
  useGetSearchArticlesQuery,
} from '../store/slices/articleSearch.slice';
import {Text} from '@react-native-material/core';

const ArticleSearchScreen = () => {
  const {
    params: {query},
  } = useRoute();

  const [page, setPage] = useState(1);

  const {data, error, isLoading} = useGetSearchArticlesQuery(
    {query, page},
    {
      selectFromResult: ({data: articlesData, ...otherParams}) => ({
        data: articlesSelector.selectAll(
          articlesData ?? articlesAdapter.getInitialState(),
        ),
        ...otherParams,
      }),
    },
  );

  return (
    <>
      <ArticleListContainer
        data={data}
        isSearching
        onEndReached={() => setPage(page + 1)}
        isLoadingItems={isLoading}
      />
      {error && <Text>{error.message}</Text>}
    </>
  );
};

export default ArticleSearchScreen;
