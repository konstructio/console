import React from 'react';
import { Story } from '@storybook/react';

import Tag, { TAG_COLOR_OPTIONS, TagProps, TAG_ICON_OPTONS } from '.';

export default {
  title: 'Components/Tag',
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

const DefaultTemplate: Story<TagProps> = (args) => <Tag {...args} />;

export const Default = DefaultTemplate.bind({});
Default.args = {
  text: 'Tag',
};
