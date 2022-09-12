import React, { FunctionComponent } from 'react';

import { TYPES } from '../../enums/typography';
import Card from '../card';
import Text from '../text';

import { Container, Content, Header } from './home.styled';

const { TITLE, SUBTITLE } = TYPES;

export interface IHomeProps {
  adminEmail: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cards: Array<any>;
  hostedZoneName: string;
}

const Home: FunctionComponent<IHomeProps> = ({ adminEmail, cards, hostedZoneName }) => {
  return (
    <Container data-testid="home-component">
      <Content>
        <Header>
          <Text type={TITLE}>Kubefirst</Text>
          <Text type={SUBTITLE}>{adminEmail}</Text>
        </Header>
        {cards.map((card) => (
          <Card key={card.appName} {...card} hostedZoneName={hostedZoneName} />
        ))}
      </Content>
    </Container>
  );
};

export default Home;
