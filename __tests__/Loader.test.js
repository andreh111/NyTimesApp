import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Loader from '../src/components/Loader';

it('renders correctly', () => {
  renderer.create(<Loader />);
});
