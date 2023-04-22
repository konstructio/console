import React, { useState } from 'react';
import styled from 'styled-components';
import { Story } from '@storybook/react';

import { INSTALLATION_CARD_OPTIONS } from '../../constants';
import Column from '../column/Column';
import { InstallationType } from '../../types/redux';

import InstallationCard from './InstallationCard';

export default {
  title: 'Components/InstallationCard',
  component: InstallationCard,
};

const DefaultTemplate: Story = () => {
  const [activeInstallType, setActiveInstallType] = useState<InstallationType>(
    InstallationType.LOCAL,
  );

  return (
    <Container>
      {Object.entries(INSTALLATION_CARD_OPTIONS).map(([optionInstallType, info]) => (
        <InstallationCard
          key={optionInstallType}
          info={info}
          onClick={() => setActiveInstallType(optionInstallType as InstallationType)}
          active={activeInstallType === optionInstallType}
        />
      ))}
    </Container>
  );
};

const Container = styled(Column)`
  align-items: center;
  gap: 20px;
`;

export const Default = DefaultTemplate.bind({});
