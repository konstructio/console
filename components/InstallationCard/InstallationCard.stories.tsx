import React from 'react';
import styled from 'styled-components';
import { Story } from '@storybook/react';

import Column from '../column';

import InstallationCard, { InstallationCardProps } from '.';

export default {
  title: 'Components/InstallationCard',
  component: InstallationCard,
};

const DefaultTemplate: Story<InstallationCardProps> = (args) => {
  return (
    <Container>
      <InstallationCard {...args} />
    </Container>
  );
};

const Container = styled(Column)`
  align-items: center;
  gap: 20px;
`;

export const Default = DefaultTemplate.bind({});
Default.args = {
  active: true,
  info: {
    description: 'test',
    title: 'aws',
  },
};
