import { Meta, StoryObj } from '@storybook/react';

import FormContainer from '.';

const meta: Meta<typeof FormContainer> = {
  component: FormContainer,
};

export default meta;

export const DefaultTemplate: StoryObj<typeof FormContainer> = {
  args: {
    style: { width: '90%', margin: '50px auto' },
  },
};
