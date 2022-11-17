import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SIZES, TYPES } from '../../enums/typography';

import TextComponent from './index';

export default {
  title: 'Layout/Typography',
  component: TextComponent,
} as ComponentMeta<typeof TextComponent>;

const Wrapper = styled.div`
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 1000px;
`;

const { BODY, DISABLED, TITLE, SUBTITLE } = TYPES;

const Template: ComponentStory<typeof TextComponent> = () => (
  <Wrapper>
    {Object.values(SIZES).map((size) => (
      <TextComponent key={size} type={TITLE} size={size}>
        {`Title size: ${size}`}
      </TextComponent>
    ))}
  </Wrapper>
);

const VariationsTemplate: ComponentStory<typeof TextComponent> = () => (
  <Wrapper>
    <TextComponent type={TITLE}>Title type: title</TextComponent>
    <TextComponent type={SUBTITLE}>Subtitle type: subtitle</TextComponent>
    <TextComponent type={BODY}>Normal text type: body</TextComponent>
    <TextComponent type={DISABLED}>Disabled text type: disabled</TextComponent>
  </Wrapper>
);

export const TextSizes = Template.bind({});

export const TextVariations = VariationsTemplate.bind({});
