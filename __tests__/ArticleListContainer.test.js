import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';
import ArticleListContainer from '../src/components/ArticleListContainer';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(() => ({})),
  };
});

it('renders correctly', () => {
  renderer.create(
    <ArticleListContainer
      data={[
        {abstract: '32423424', multimedia: 'm1'},
        {abstract: '45325235', multimedia: 'm2'},
      ]}
      isSearching
    />,
  );
});
