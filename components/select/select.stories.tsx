import { Meta, StoryObj } from '@storybook/react';

import SelectComponent from './index';

const meta: Meta<typeof SelectComponent> = {
  title: 'Form Elements/Select',
  component: SelectComponent,
};

export default meta;

export const Default: StoryObj<typeof SelectComponent> = {
  args: {
    label: 'Default',
    placeholder: 'Select',
    required: true,
    options: [
      {
        label: 'us-east-1',
        value: 'us-east-1',
      },
      {
        label: 'us-west-1',
        value: 'us-west-1',
      },
    ],
  },
};
