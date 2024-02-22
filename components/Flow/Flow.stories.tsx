import { Meta, StoryObj } from '@storybook/react';

import { noop } from '../../utils/noop';

import { Flow } from './Flow';

const meta: Meta<typeof Flow> = {
  component: Flow,
};

export default meta;

export const Default: StoryObj<typeof Flow> = {
  args: {
    onNodeClick: noop,
  },
};
