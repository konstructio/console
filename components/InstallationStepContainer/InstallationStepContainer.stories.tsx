import React from 'react';
import { Story } from '@storybook/react';

import { GitProvider } from '../../types';
import { useInstallation } from '../../hooks/useInstallation';
import useStep from '../../hooks/useStep';
import { InstallationType } from '../../types/redux';

import InstallationStepContainer from './InstallationStepContainer';

export default {
  title: 'Components/InstallationStepContainer',
  component: InstallationStepContainer,
};

const DefaultTemplate: Story = () => {
  const { stepTitles, installTitles } = useInstallation(InstallationType.LOCAL, GitProvider.GITHUB);
  const { currentStep, goToNext, goToPrev } = useStep(0);

  const installTitle = installTitles[currentStep];

  return (
    <InstallationStepContainer
      installationTitle={installTitle}
      steps={stepTitles}
      activeStep={currentStep}
      showBackButton={currentStep > 0}
      onNextButtonClick={goToNext}
      onBackButtonClick={goToPrev}
    >
      <h1 style={{ margin: '0 auto' }}>Current Step: {currentStep}</h1>
    </InstallationStepContainer>
  );
};

export const Default = DefaultTemplate.bind({});
