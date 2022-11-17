import { screen } from '@testing-library/react';

import Progress, { IProgressProps } from './index';

import setupComponent from 'tests/setup';

const defaultProps: IProgressProps = {
  progress: 10,
  color: 'red',
  label: 'progress',
};

const setup = setupComponent<IProgressProps>(Progress, defaultProps);

describe('Progress', () => {
  test('should render the Progress component', async () => {
    await setup();
    expect(screen.queryByTestId('progress')).toBeInTheDocument();
  });
});
