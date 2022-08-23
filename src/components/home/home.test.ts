import { screen } from '@testing-library/react';
import setupComponent from 'tests/setup';

import Home from './index';

const setup = setupComponent(Home);
describe('home', () => {
  test('should render the home component', async () => {
    await setup();
    expect(screen.queryByTestId('home-component')).toBeInTheDocument();
  });
});
