import { screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import setupComponent from 'tests/setup';

import Tag, { ITagProps } from './index';

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
