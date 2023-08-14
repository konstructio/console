import React, { useState } from 'react';
import { Story } from '@storybook/react';

import Button from '../../components/button';
import { noop } from '../../utils/noop';

import DeleteCluster from './';

export default {
  title: 'Components/DeleteCluster',
  component: DeleteCluster,
};

const DefaultTemplate: Story = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DeleteCluster
        clusterName="kubefirst-worker-one"
        isOpen={open}
        onClose={() => setOpen(false)}
        onDelete={noop}
        {...args}
      />
      <Button variant="contained" color="primary" onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Open'}
      </Button>
    </>
  );
};

export const Default = DefaultTemplate.bind({});
