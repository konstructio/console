import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { faker } from '@faker-js/faker';

import theme from '../../theme';

import Tag from './index';

const url = faker.internet.url();
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
    <Tag url={url} backgroundColor={bleachedSilk}>
      Docs
    </Tag>
    <Tag url={url} backgroundColor={transparentBlue}>
      Datadog
    </Tag>
    <Tag url={url} backgroundColor={naivePeach}>
      Argo CD
    </Tag>
    <Tag url={url} backgroundColor={dawnDeparts}>
      GitHub
    </Tag>
  </Wrapper>
);

export const Basic = Template.bind({});
