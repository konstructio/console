import React, { useEffect } from 'react';
import { Story } from '@storybook/react';

import { useAppDispatch } from '../../../redux/store';
import { setInstallationStep } from '../../../redux/slices/installation.slice';

import { LocalFormFlow } from './LocalFormFlow';

export default {
  title: 'Forms/Local/LocalFormFlow',
  component: LocalFormFlow,
};

const DefaultTemplate: Story = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setInstallationStep(1));
  }, [dispatch]);

  return <LocalFormFlow />;
};

export const Default = DefaultTemplate.bind({});
