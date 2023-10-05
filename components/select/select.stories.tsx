import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { TAG_COLOR_OPTIONS } from '../tag';

import SelectComponent, { EnvironmentSelectWithRef, TagSelectWithRef } from './index';

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

export const TagSelect: StoryObj<typeof TagSelectWithRef> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ key, ...args }) => <TagSelectWithRef {...args} />,
  args: {
    label: 'Cluster environments',
    placeholder: 'Select',
    required: true,
    options: TAG_COLOR_OPTIONS,
  },
};

export const EnvironmentSelect: StoryObj<typeof EnvironmentSelectWithRef> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ key, ...args }) => <EnvironmentSelectWithRef {...args} />,
  args: {
    label: 'Environment cluster will host',
    required: true,
    options: [{ environmentName: 'development', labelColor: 'dark-sky-blue' }],
  },
};
