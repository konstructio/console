import { Meta, StoryObj } from '@storybook/react';

import ApplicationsFilter from '.';

const meta: Meta<typeof ApplicationsFilter> = {
  component: ApplicationsFilter,
};

export default meta;

export const Default: StoryObj<typeof ApplicationsFilter> = {
  args: {
    targetOptions: [{ value: 'yes', label: 'yes' }],
    clusterSelectOptions: [{ value: 'yes', label: 'yes' }],
    searchOptions: [{ value: 'yes', label: 'yes' }],
    onFilterChange: (filter) => console.log('filter =>', filter),
  },
};
