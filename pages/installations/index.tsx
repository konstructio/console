import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';
import InstallationInfoCard from 'components/InstallationInfoCard/InstallationInfoCard';
import InstallationStepContainer from 'components/InstallationStepContainer/InstallationStepContainer';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setInstallType, setInstallationStep } from '../../redux/slices/installation.slice';
import InstallationCard from '../../components/InstallationCard/InstallationCard';
import { InstallationType } from '../../types/redux';
import { useInstallation } from '../../hooks/useInstallation';
import { INSTALLATION_CARD_OPTIONS } from '../../constants';
import Column from '../../components/Column/Column';

const InstallationsSelectionPage: FunctionComponent = () => {
  const router = useRouter();

  const { installType, installationStep } = useAppSelector(({ installation }) => installation);

  const dispatch = useAppDispatch();

  const { info, stepTitles, installTitles } = useInstallation(installType);

  const installTitle = installTitles[installationStep];

  const handleInstallTypeChange = useCallback(
    (type: InstallationType) => {
      dispatch(setInstallType(type));
    },
    [dispatch],
  );

  const handleNextButtonClick = useCallback(() => {
    dispatch(setInstallationStep(installationStep + 1));
    router.push(`installations/${installType}`);
  }, [dispatch, installationStep, router, installType]);

  return (
    <InstallationStepContainer
      activeStep={installationStep}
      steps={stepTitles}
      installationTitle={installTitle}
      showBackButton={false}
      onNextButtonClick={handleNextButtonClick}
    >
      <CardContainer>
        {Object.entries(INSTALLATION_CARD_OPTIONS).map(([optionInstallType, info]) => (
          <InstallationCard
            key={optionInstallType}
            info={info}
            active={optionInstallType === installType}
            onClick={() => handleInstallTypeChange(optionInstallType as InstallationType)}
          />
        ))}
      </CardContainer>
      <InfoContainer>
        <InstallationInfoCard info={info} />
      </InfoContainer>
    </InstallationStepContainer>
  );
};

export default InstallationsSelectionPage;

const CardContainer = styled(Column)`
  gap: 16px;
  margin: 0 20px 0 80px;
`;

const InfoContainer = styled.div`
  position: sticky;
  top: 0;
`;
