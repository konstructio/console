import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';
import { INSTALLATION_TYPES, InstallationType } from 'types/redux';
import { noop } from 'utils/noop';
import GitProviderButton from 'components/gitProviderButton/GitProviderButton';
import { media } from 'utils/media';
import { useRouter } from 'next/router';

import { GIT_PROVIDERS, GitProvider } from '../../types';
import Typography from '../../components/typography';
import InstallationStepContainer from '../../components/installationStepContainer/InstallationStepContainer';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setGitProvider, setInstallType } from '../../redux/slices/installation.slice';
import Column from '../../components/column/Column';
import Row from '../../components/row/Row';
import CloudProviderCard from '../../components/cloudProviderCard/CloudProviderCard';

const InstallationsSelectionPage: FunctionComponent = () => {
  const { installType, gitProvider, installationStep } = useAppSelector(
    ({ installation }) => installation,
  );

  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleInstallTypeChange = useCallback(
    (type: InstallationType) => {
      dispatch(setInstallType(type));
    },
    [dispatch],
  );

  const handleGitProviderChange = useCallback(
    (provider: GitProvider) => {
      dispatch(setGitProvider(provider));
    },
    [dispatch],
  );

  const handleNextButtonClick = useCallback(() => {
    if (installType === InstallationType.CIVO && gitProvider === GitProvider.GITHUB) {
      router.push(`installations/${installType}`);
    }
  }, [router, installType, gitProvider]);

  return (
    <InstallationStepContainer
      activeStep={installationStep}
      steps={['Select Platform', 'Set up Cluster', 'Provisioning', 'Ready']}
      installationTitle="First, select your preferred Git provider"
      showBackButton={false}
      onNextButtonClick={handleNextButtonClick}
      nextButtonDisabled={!installType}
    >
      <ContentContainer>
        <ButtonContainer>
          {GIT_PROVIDERS.map((provider) => (
            <GitProviderButton
              key={provider}
              option={provider}
              active={provider === gitProvider}
              onClick={() => handleGitProviderChange(provider)}
            />
          ))}
        </ButtonContainer>
        {gitProvider && (
          <AdventureContent>
            <Subtitle variant="subtitle2">Now Select your cloud adventure</Subtitle>
            <CloudProviderContainer>
              {INSTALLATION_TYPES.map((type) => (
                <CloudProviderCard
                  key={type}
                  option={type}
                  active={type === installType}
                  onClick={() => handleInstallTypeChange(type)}
                />
              ))}
            </CloudProviderContainer>
          </AdventureContent>
        )}
      </ContentContainer>
    </InstallationStepContainer>
  );
};

export default InstallationsSelectionPage;

const ContentContainer = styled(Column)`
  align-items: center;
  padding: 0 40px;
  width: 100%;
`;

const ButtonContainer = styled(Row)`
  justify-content: center;
  gap: 24px;
`;

const AdventureContent = styled(Column)`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Subtitle = styled(Typography)`
  margin: 40px 0 24px 0;
`;

const CloudProviderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  ${media.greaterThan('lg')`
    grid-template-columns: 1fr 1fr;
  `}
`;
