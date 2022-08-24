import { screen } from '@testing-library/react';
import setupComponent from 'tests/setup';

import Sidebar, { ISidebarProps } from './index';

const defaultProps = {
  onSidebarItemClick: jest.fn(),
};

const setup = setupComponent<ISidebarProps>(Sidebar, defaultProps);

describe('Sidebar', () => {
  test('should render the Sidebar component', async () => {
    await setup();
    expect(screen.queryByTestId('sidebar-component')).toBeInTheDocument();
  });
});
