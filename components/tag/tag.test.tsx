import { screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';

import Tag, { ITagProps } from './index';

import setupComponent from 'tests/setup';

const defaultProps = {
  backgroundColor: 'red',
  children: 'Tag',
  url: faker.internet.url(),
};

const setup = setupComponent<ITagProps>(Tag, defaultProps);

describe('Tag', () => {
  test('should render the Tag component', async () => {
    await setup();
    expect(screen.queryByTestId('tag')).toBeInTheDocument();
  });
});
