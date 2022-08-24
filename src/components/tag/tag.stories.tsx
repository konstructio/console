import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import theme from '../../theme';

import Tag from './index';

const {
  colors: { bleachedSilk, dawnDeparts, naivePeach, transparentBlue },
} = theme;

export default {
  title: 'Components/Tags',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Template: ComponentStory<typeof Tag> = () => (
  <Wrapper>
    <Tag backgroundColor={bleachedSilk}>Docs</Tag>
    <Tag backgroundColor={transparentBlue}>Datadog</Tag>
    <Tag backgroundColor={naivePeach}>Argo CD</Tag>
    <Tag backgroundColor={dawnDeparts}>GitHub</Tag>
  </Wrapper>
);

export const Basic = Template.bind({});
