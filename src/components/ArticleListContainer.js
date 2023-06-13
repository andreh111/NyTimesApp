import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlatList} from 'react-native';

import ArticleItem from './ArticleItem';
import Loader from './Loader';

const ArticleListContainer = ({
  data,
  isSearching,
  isLoadingItems,
  onEndReached,
}) => {
  const navigation = useNavigation();

  const keyExtractor = ({abstract}) => abstract;

  const onViewArticleDetails =
    ({title, abstract, published_date, multimedia, url}) =>
    () =>
      navigation.navigate('ArticleDetail', {
        title,
        abstract,
        published_date,
        multimedia,
        url,
      });

  const renderItem = ({
    item: {title, abstract, published_date, multimedia, url},
  }) => (
    <ArticleItem
      key={abstract}
      onPress={onViewArticleDetails({
        title,
        abstract,
        published_date,
        multimedia,
        url,
      })}
      abstract={abstract}
      multimediaUrl={
        isSearching
          ? `https://static01.nyt.com/${multimedia[0]?.legacy?.xlarge}`
          : multimedia?.[0]?.url
      }
    />
  );

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={data}
      renderItem={renderItem}
      ListFooterComponent={isLoadingItems && <Loader />}
      onEndReached={onEndReached}
    />
  );
};

export default ArticleListContainer;
