import React from 'react';
import { Story } from '@storybook/react';
import styled from 'styled-components';

import NextLink from '.';

export default {
  title: 'Components/NextLink',
  component: NextLink,
};

const DefaultTemplate: Story = () => <Link href="">Link</Link>;

const Link = styled(NextLink)`
  margin: 50px;

  a {
    text-decoration: none;
  }
`;

export const Default = DefaultTemplate.bind({});
