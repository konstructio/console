import { screen } from '@testing-library/react';

import Home from './index';

import setupComponent from 'tests/setup';

const setup = setupComponent(Home);
describe('home', () => {
  test('should render the home component', async () => {
    await setup({ cards: [] });
    expect(screen.queryByTestId('home-component')).toBeInTheDocument();
  });
});
