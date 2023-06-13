import React from 'react';
import {render} from '@testing-library/react-native';
import NewsCategoryScreen from '../src/screens/NewsCategoryScreen';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(() => ({})),
  };
});

jest.mock('react-redux', () => {
  const actualRedux = jest.requireActual('react-redux');
  return {
    ...actualRedux,
    useDispatch: () => jest.fn(),
    useSelector: () => [],
  };
});

test('renders search input', () => {
  const {getByPlaceholderText} = render(<NewsCategoryScreen />);
  const searchInput = getByPlaceholderText('Article name');
  expect(searchInput).toBeTruthy();
});

test('renders Category chips', () => {
  const {getAllByText} = render(<NewsCategoryScreen />);
  const scienceChip = getAllByText('Science')[0];
  const worldChip = getAllByText('World')[0];
  expect(scienceChip).toBeTruthy();
  expect(worldChip).toBeTruthy();
});
