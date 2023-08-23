import React from 'react';
import styled from 'styled-components';
import { Meta, StoryObj } from '@storybook/react';

import CheckboxComponent from './index';

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40px;
`;

const meta: Meta<typeof CheckboxComponent> = {
  component: CheckboxComponent,
  decorators: [
    (Story) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof CheckboxComponent> = {
  args: {
    required: true,
  },
};

export const Checked: StoryObj<typeof CheckboxComponent> = {
  args: {
    checked: true,
  },
};

export const Disabled: StoryObj<typeof CheckboxComponent> = {
  args: {
    disabled: true,
  },
};
