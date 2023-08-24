import { Meta, StoryObj } from '@storybook/react';

import Tag, { TAG_COLOR_OPTIONS, TAG_ICON_OPTONS } from '.';

const meta: Meta<typeof Tag> = {
  component: Tag,
  argTypes: {
    bgColor: {
      control: 'select',
      options: TAG_COLOR_OPTIONS,
    },
    icon: {
      control: 'radio',
      options: Object.keys(TAG_ICON_OPTONS),
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Tag> = {
  args: {
    text: 'Tag',
  },
};
