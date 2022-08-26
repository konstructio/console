import { screen } from '@testing-library/react';
import setupComponent from 'tests/setup';

import Progress, { IProgressProps } from './index';

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
