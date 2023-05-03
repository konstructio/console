import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { createCluster } from '../../redux/thunks/cluster';
import InstallationStepContainer from '../../components/installationStepContainer';
import InstallationInfoCard from '../../components/installationInfoCard';
import { InstallationsSelection } from '../installationsSelection';
import {
  resetInstallState,
  setInstallValues,
  setInstallationStep,
} from '../../redux/slices/installation.slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useInstallation } from '../../hooks/useInstallation';
import { InstallValues, InstallationType } from '../../types/redux';
import { GitProvider } from '../../types';
import { setConfigValues } from '../../redux/slices/config.slice';

import { Form, FormContent } from './provision.styled';

export interface ProvisionProps {
  apiUrl: string;
  useTelemetry: boolean;
}

const Provision: FunctionComponent<ProvisionProps> = ({ apiUrl, useTelemetry }) => {
  const dispatch = useAppDispatch();
  const { installType, gitProvider, installationStep, values } = useAppSelector(
    ({ installation }) => installation,
  );

  const {
    stepTitles,
    formFlow: FormFlow,
    installTitles,
    info,
    isProvisionStep,
  } = useInstallation(
    installType as InstallationType,
    gitProvider as GitProvider,
    installationStep,
  );

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
    trigger,
    watch,
    reset,
  } = useForm({ mode: 'onChange' });

  const installTitle = useMemo(
    () => installTitles[installationStep],
    [installTitles, installationStep],
  );

  const hasInfo = useMemo(() => !!info?.title, [info?.title]);

  const isLastStep = useMemo(
    () => installationStep === stepTitles.length - 1,
    [installationStep, stepTitles.length],
  );

  const handleNextButtonClick = useCallback(() => {
    dispatch(setInstallationStep(installationStep + 1));
  }, [dispatch, installationStep]);

  const handleBackButtonClick = useCallback(() => {
    dispatch(setInstallationStep(installationStep - 1));
  }, [dispatch, installationStep]);

  const onSubmit = async (values: InstallValues) => {
    if (isValid) {
      dispatch(setInstallValues(values));

      if (isProvisionStep) {
        const params = {
          clusterName: values.clusterName,
          admin_email: values.alertsEmail,
          cloud_provider: installType?.toString(),
          cloud_region: values.cloudRegion,
          domain_name: values.domainName,
          git_owner: values?.gitOwner,
          git_provider: gitProvider,
          git_token: values?.gitToken,
          type: 'mgmt',
        };

        try {
          await dispatch(createCluster({ apiUrl, values: params })).unwrap();
        } catch (error) {
          //todo: error handling to be defined
        }
      }

      handleNextButtonClick();
    }
  };

  useEffect(() => {
    dispatch(setConfigValues({ isTelemetryEnabled: useTelemetry, apiUrl }));

    return () => {
      dispatch(resetInstallState());
    };
  }, [dispatch, useTelemetry, apiUrl]);

  return installationStep === 0 ? (
    <InstallationsSelection steps={stepTitles} reset={reset} />
  ) : (
    <Form component="form" onSubmit={handleSubmit(onSubmit)}>
      <InstallationStepContainer
        activeStep={installationStep}
        steps={stepTitles}
        installationTitle={installTitle}
        showBackButton
        onNextButtonClick={handleNextButtonClick}
        onBackButtonClick={handleBackButtonClick}
        nextButtonText={isProvisionStep ? 'Create cluster' : 'Next'}
        nextButtonDisabled={!isValid}
        hasInfo={hasInfo}
      >
        <FormContent hasInfo={hasInfo} isLastStep={isLastStep}>
          <FormFlow
            control={control}
            currentStep={installationStep}
            setValue={setValue}
            trigger={trigger}
            watch={watch}
            clusterName={values?.clusterName as string}
            domainName={values?.domainName as string}
          />
        </FormContent>
        {info && <InstallationInfoCard info={info} />}
      </InstallationStepContainer>
    </Form>
  );
};

export default Provision;
