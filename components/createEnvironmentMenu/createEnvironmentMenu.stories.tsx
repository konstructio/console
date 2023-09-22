import { Meta, StoryObj } from '@storybook/react';

import { CreateEnvironmentMenu } from '.';

const meta: Meta<typeof CreateEnvironmentMenu> = {
  component: CreateEnvironmentMenu,
};

export default meta;

export const Default: StoryObj<typeof CreateEnvironmentMenu> = {
  args: {
    previouslyCreatedEnvironments: [
      { environmentName: 'development', labelColor: 'dark-sky-blue' },
    ],
  },
};
