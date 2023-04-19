import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';
import InstallationInfoCard from 'components/installationInfoCard/InstallationInfoCard';
import InstallationStepContainer from 'components/installationStepContainer/InstallationStepContainer';
import { useRouter } from 'next/router';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setInstallType, setInstallationStep } from '../../redux/slices/installation.slice';
import InstallationCard from '../../components/installationCard/InstallationCard';
import { InstallationType } from '../../types/redux';
import { useInstallation } from '../../hooks/useInstallation';
import { INSTALLATION_CARD_OPTIONS } from '../../constants';
import Column from '../../components/column/Column';
import Row from '../../components/row/Row';

const InstallationsSelectionPage: FunctionComponent = () => {
  const router = useRouter();

  const { installType, installationStep } = useAppSelector(({ installation }) => installation);

  const dispatch = useAppDispatch();

  const { info, stepTitles } = useInstallation(installType);

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
      installationTitle="First, choose your Kubefirst adventure"
      showBackButton={false}
      onNextButtonClick={handleNextButtonClick}
    >
      <ContentContainer>
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
      </ContentContainer>
    </InstallationStepContainer>
  );
};

export default InstallationsSelectionPage;

const ContentContainer = styled(Row)`
  justify-content: center;
  flex: 1;
  padding: 0 80px;
`;

const CardContainer = styled(Column)`
  gap: 16px;
  margin: 0 20px 0 80px;
`;

const InfoContainer = styled.div`
  position: sticky;
  top: 0;
`;
