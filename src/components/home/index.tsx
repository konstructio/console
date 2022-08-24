import React from 'react';

import { TYPES } from '../../enums/typography';
import Card from '../card';
import Text from '../text';

import { Container, Content, Header } from './home.styled';

const { TITLE, SUBTITLE } = TYPES;

const Home = () => {
  return (
    <Container data-testid="home-component">
      <Header>
        <Text type={TITLE}>Kubefirst</Text>
        <Text type={SUBTITLE}>cristhian@kubeshop.io</Text>
      </Header>

      <Content>
        <Card />
      </Content>
    </Container>
  );
};

export default Home;
