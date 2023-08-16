import React from 'react';
import { noop } from 'lodash';
import { ComponentStory } from '@storybook/react';

import ClusterReady from '.';

export default {
  title: 'Components/ClusterReady',
  component: ClusterReady,
};

const DefaultTemplate: ComponentStory<typeof ClusterReady> = (args) => <ClusterReady {...args} />;

export const Default = DefaultTemplate.bind({});
Default.args = {
  onOpenConsole: noop,
  kbotPassword: 'feedkray',
};
