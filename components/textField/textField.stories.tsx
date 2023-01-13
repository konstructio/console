import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PasswordComponent from '../password';

import TextFieldComponent from './index';

export default {
  title: 'Form Elements/TextField',
  component: TextFieldComponent,
} as ComponentMeta<typeof TextFieldComponent>;

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
`;

const DefaultTemplate: ComponentStory<typeof TextFieldComponent> = () => (
  <Wrapper>
    <TextFieldComponent label="Default" fullWidth />
  </Wrapper>
);

const OutlinedTemplate: ComponentStory<typeof TextFieldComponent> = () => (
  <Wrapper>
    <TextFieldComponent label="Outlined" />
  </Wrapper>
);

const DisabledTemplate: ComponentStory<typeof TextFieldComponent> = () => (
  <Wrapper>
    <TextFieldComponent color="primary" label="Disabled" disabled value="Text" />
  </Wrapper>
);

const PasswordTemplate: ComponentStory<typeof TextFieldComponent> = () => (
  <Wrapper>
    <PasswordComponent label="Password" />
  </Wrapper>
);

const ErrorTemplate: ComponentStory<typeof TextFieldComponent> = () => (
  <Wrapper>
    <TextFieldComponent
      error
      id="standard-error-helper-text"
      label="Label *"
      defaultValue="Hello World"
      helperText="Incorrect entry."
      variant="standard"
    />
  </Wrapper>
);

export const Default = DefaultTemplate.bind({});

export const Outlined = OutlinedTemplate.bind({});

export const Disabled = DisabledTemplate.bind({});

export const Password = PasswordTemplate.bind({});

export const Error = ErrorTemplate.bind({});
