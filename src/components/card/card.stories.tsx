import React from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ArgoCDLogo from '../../assets/argocd.png';

import Card from './index';

export default {
  title: 'Components/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
`;

const Template: ComponentStory<typeof Card> = (props) => (
  <Wrapper>
    <Card {...props} />
  </Wrapper>
);

export const Basic = Template.bind({});
Basic.args = {
  appName: 'Argo',
  links: ['https://argo.your-company.io'],
  logo: ArgoCDLogo,
};
