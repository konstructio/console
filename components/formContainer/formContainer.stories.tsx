import React from 'react';
import { Story } from '@storybook/react';

import FormContainer from '.';

export default {
  title: 'Components/FormContainer',
  component: FormContainer,
};

const DefaultTemplate: Story = () => <FormContainer style={{ margin: 50 }} />;

export const Default = DefaultTemplate.bind({});
