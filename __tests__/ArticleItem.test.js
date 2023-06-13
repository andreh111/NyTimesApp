import React from 'react';
import renderer from 'react-test-renderer';
import ArticleItem from '../src/components/ArticleItem';

it('renders correctly', () => {
  renderer.create(
    <ArticleItem
      abstract="good weather for today"
      multimediaUrl="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    />,
  );
});
