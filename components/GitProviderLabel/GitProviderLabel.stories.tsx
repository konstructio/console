import { Meta, StoryObj } from '@storybook/react';

import GitProviderLabel from './GitProviderLabel';

import { GitProvider } from '@/types';

const meta: Meta<typeof GitProviderLabel> = {
  component: GitProviderLabel,
};

export default meta;

export const Default: StoryObj<typeof GitProviderLabel> = {
  args: {
    gitProvider: GitProvider.GITLAB,
    withIcon: true,
  },
};
