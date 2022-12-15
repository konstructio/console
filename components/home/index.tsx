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
  isLocal: boolean;
  onClickLink: (url: string, serviceName: string) => void;
  onClickTag: (url: string, serviceName: string) => void;
}

const Home: FunctionComponent<IHomeProps> = ({
  adminEmail,
  clusterName,
  cards,
  hostedZoneName,
  isLocal,
  onClickLink,
  onClickTag,
}) => {
  return (
    <Container data-testid="home-component">
      <Content isLocal={isLocal}>
        <Header>
          <Text type={TITLE}>Kubefirst</Text>
          {adminEmail && <Text type={SUBTITLE}>{`Admin Email: ${adminEmail}`}</Text>}
          {clusterName && <Text type={SUBTITLE}>{`Cluster Name: ${clusterName}`}</Text>}
        </Header>
        {cards &&
          cards.map((card) => (
            <Card
              key={card.appName}
              {...card}
              hostedZoneName={hostedZoneName}
              onClickLink={onClickLink}
              onClickTag={onClickTag}
            />
          ))}
      </Content>
    </Container>
  );
};

export default Home;
