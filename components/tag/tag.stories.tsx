import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { faker } from '@faker-js/faker';
import { action } from '@storybook/addon-actions';

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

const Template: ComponentStory<typeof Tag> = (args) => (
  <Wrapper>
    <Tag {...args} url={url} backgroundColor={bleachedSilk}>
      Docs
    </Tag>
    <Tag {...args} url={url} backgroundColor={transparentBlue}>
      Datadog
    </Tag>
    <Tag {...args} url={url} backgroundColor={naivePeach}>
      Argo CD
    </Tag>
    <Tag {...args} url={url} backgroundColor={dawnDeparts}>
      GitHub
    </Tag>
  </Wrapper>
);

export const Basic = Template.bind({});
Basic.args = {
  onClick: action('onTagClick'),
};
