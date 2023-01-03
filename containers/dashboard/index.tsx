import Typography from 'components/typography/index';
import useInstallation, { InstallationTypes } from 'hooks/useInstallation';
import React, { FunctionComponent, useEffect } from 'react';

import useStep from '../../hooks/useStep';
import Progress from '../../components/progress';

import {
  Card,
  CardContainer,
  CardDescription,
  CartTitle,
  Container,
  Content,
  Header,
  Title,
} from './dashboard.styled';

const STEPS = ['Select platform', 'Readiness check', 'Set up cluster', 'Preparing', 'Ready'];
const CARD_ITEMS = [
  {
    description: 'Explore all you can do with Kubefirst with no costs by running locally.',
    title: 'Run Locally',
    type: InstallationTypes.LOCAL,
  },
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    title: 'AWS with GitHub',
    type: InstallationTypes.AWS_GITHUB,
  },
  {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    title: 'AWS with GitLab',
    type: InstallationTypes.AWS_GITLAB,
  },
];

const Dashboard: FunctionComponent = () => {
  const { currentStep } = useStep();
  const { steps, installationType, onChangeInstallationType } = useInstallation();

  return (
    <Container>
      <Header />
      <Progress activeStep={currentStep} steps={steps} />
      <Title>
        <Typography variant="h6">First, choose your Kubefirst adventure</Typography>
      </Title>
      <Content>
        <CardContainer>
          {CARD_ITEMS.map(({ description, title, type }) => (
            <Card
              key={title}
              onClick={() => onChangeInstallationType(type)}
              isActive={installationType === type}
            >
              <CartTitle>
                <Typography variant="h6">{title}</Typography>
              </CartTitle>
              <CardDescription>
                <Typography variant="body2">{description}</Typography>
              </CardDescription>
            </Card>
          ))}
        </CardContainer>
      </Content>
    </Container>
  );
};

export default Dashboard;
