import React from 'react';
import renderer from 'react-test-renderer';
import ArticleDetailScreen from '../src/screens/ArticleDetailScreen';

jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({
    params: {
      title: 'Test Title',
      abstract: 'Test Abstract',
      published_date: '2022-01-01',
      multimedia: [{url: 'https://example.com/image.jpg'}],
    },
  }),
}));

describe('ArticleDetailScreen', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ArticleDetailScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
