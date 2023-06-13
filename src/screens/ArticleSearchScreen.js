import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Text} from '@react-native-material/core';

import ArticleListContainer from '../components/ArticleListContainer';
import {
  articlesAdapter,
  articlesSelector,
  useGetSearchArticlesQuery,
} from '../store/slices/articleSearch.slice';

const ArticleSearchScreen = () => {
  const {
    params: {query},
  } = useRoute();

  const [page, setPage] = useState(1);

  const {data, error, isFetching} = useGetSearchArticlesQuery(
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
        isLoadingItems={isFetching}
      />
      {error && <Text>{error.message}</Text>}
    </>
  );
};

export default ArticleSearchScreen;
