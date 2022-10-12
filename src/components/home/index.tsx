import React, { FunctionComponent } from 'react';

import { TYPES } from '../../enums/typography';
import Card from '../card';
import Text from '../text';

import { Container, Content, Header } from './home.styled';

const { SUBTITLE, TITLE } = TYPES;

export interface IHomeProps {
  adminEmail: string;
  clusterName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cards: Array<any>;
  hostedZoneName: string;
}

const Home: FunctionComponent<IHomeProps> = ({
  adminEmail,
  clusterName,
  cards,
  hostedZoneName,
}) => {
  return (
    <Container data-testid="home-component">
      <Content>
        <Header>
          <Text type={TITLE}>Kubefirst</Text>
          <Text type={SUBTITLE}>{`Admin Email: ${adminEmail}`}</Text>
          <Text type={SUBTITLE}>{`Cluster Name: ${clusterName}`}</Text>
        </Header>
        {cards &&
          cards.map((card) => (
            <Card key={card.appName} {...card} hostedZoneName={hostedZoneName} />
          ))}
      </Content>
    </Container>
  );
};

export default Home;
