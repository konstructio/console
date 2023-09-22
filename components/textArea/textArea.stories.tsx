import { Meta, StoryObj } from '@storybook/react';

import { TextArea } from '.';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
};

export default meta;

export const Default: StoryObj<typeof TextArea> = {
  args: {
    label: 'Description',
    helperText: 'Nice',
    error: true,
  },
};
