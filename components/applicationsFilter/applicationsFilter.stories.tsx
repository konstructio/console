import { Meta, StoryObj } from '@storybook/react';

import ApplicationsFilter from '.';

import { noop } from '@/utils/noop';

const meta: Meta<typeof ApplicationsFilter> = {
  component: ApplicationsFilter,
};

export default meta;

export const Default: StoryObj<typeof ApplicationsFilter> = {
  args: {
    autoCompleteProps: {
      value: '',
      label: '',
      options: [{ value: 'yes', label: 'yes' }],
      onChange: (e) => console.log(e.target.value),
      onBlur: noop,
      name: '',
      placeholder: 'Search app name',
    },
    targetOptions: [{ value: 'yes', label: 'yes' }],
    clusterSelectOptions: [{ value: 'yes', label: 'yes' }],
  },
};
