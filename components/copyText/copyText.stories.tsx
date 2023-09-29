import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import Typography from '../typography';
import Row from '../row';

import CopyText from '.';

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const meta: Meta<typeof CopyText> = {
  component: CopyText,
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof CopyText> = {
  args: {
    textToCopy: 'nice',
  },
};

export const Example: StoryObj<typeof CopyText> = {
  args: {
    textToCopy: 'kubefirst-worker-one',
  },
  render: (args) => (
    <Row style={{ alignItems: 'baseline' }}>
      <Typography>Are you sure you want to delete the cluster</Typography>
      <CopyText {...args} style={{ margin: '0 3px' }} />
      <Typography>? This action cannot be undone.</Typography>
    </Row>
  ),
};
