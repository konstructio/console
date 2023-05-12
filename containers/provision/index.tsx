import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { createCluster } from '../../redux/thunks/cluster.thunk';
import InstallationStepContainer from '../../components/installationStepContainer';
import InstallationInfoCard from '../../components/installationInfoCard';
import { InstallationsSelection } from '../installationsSelection';
import {
  clearError,
  resetInstallState,
  setInstallValues,
  setInstallationStep,
} from '../../redux/slices/installation.slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useInstallation } from '../../hooks/useInstallation';
import { InstallValues, InstallationType } from '../../types/redux';
import { GitProvider } from '../../types';
import { setConfigValues } from '../../redux/slices/config.slice';
import { clearClusterState } from '../../redux/slices/cluster.slice';
import AdvancedOptions from '../clusterForms/shared/advancedOptions';
import ErrorBanner from '../../components/errorBanner';

import { AdvancedOptionsContainer, Form, FormContent } from './provision.styled';

export interface ProvisionProps {
  apiUrl: string;
  useTelemetry: boolean;
}

const Provision: FunctionComponent<ProvisionProps> = ({ apiUrl, useTelemetry }) => {
  const dispatch = useAppDispatch();
  const { installType, gitProvider, installationStep, values, error } = useAppSelector(
    ({ installation }) => installation,
  );

  const {
    stepTitles,
    formFlow: FormFlow,
    installTitles,
    info,
    isProvisionStep,
    isSetupStep,
  } = useInstallation(
    installType as InstallationType,
    gitProvider as GitProvider,
    installationStep,
  );

  const {
    control,
    formState: { isValid: isFormValid },
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

  const isValid = useMemo(() => {
    if (installationStep === 0) {
      return !!gitProvider && !!installType;
    }
    return isFormValid && !error;
  }, [error, gitProvider, installType, installationStep, isFormValid]);

  const handleNextButtonClick = useCallback(async () => {
    dispatch(setInstallationStep(installationStep + 1));

    setTimeout(trigger, 500);
    dispatch(clearError());
    dispatch(clearClusterState());
  }, [dispatch, installationStep, trigger]);

  const handleBackButtonClick = useCallback(() => {
    dispatch(setInstallationStep(installationStep - 1));
    dispatch(clearError());
  }, [dispatch, installationStep]);

  const onSubmit = async (values: InstallValues) => {
    if (isValid) {
      dispatch(setInstallValues(values));

      if (isSetupStep) {
        try {
          await dispatch(createCluster({ apiUrl, values })).unwrap();
          handleNextButtonClick();
        } catch (error) {
          //todo: error handling to be defined
        }
      } else {
        handleNextButtonClick();
      }
    }
  };

  const form = useMemo(() => {
    if (installationStep === 0) {
      return <InstallationsSelection steps={stepTitles} reset={reset} />;
    }

    return (
      <>
        <FormContent hasInfo={hasInfo} isLastStep={isLastStep} isProvisionStep={isProvisionStep}>
          {error && <ErrorBanner text={error} />}
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
        {isSetupStep && (
          <AdvancedOptionsContainer>
            <AdvancedOptions
              control={control}
              currentStep={installationStep}
              setValue={setValue}
              trigger={trigger}
              watch={watch}
              clusterName={values?.clusterName as string}
              domainName={values?.domainName as string}
            />
          </AdvancedOptionsContainer>
        )}
      </>
    );
  }, [
    FormFlow,
    control,
    error,
    hasInfo,
    installationStep,
    isLastStep,
    isSetupStep,
    isProvisionStep,
    reset,
    setValue,
    stepTitles,
    trigger,
    values?.clusterName,
    values?.domainName,
    watch,
  ]);

  useEffect(() => {
    dispatch(setConfigValues({ isTelemetryEnabled: useTelemetry, apiUrl }));

    return () => {
      dispatch(resetInstallState());
    };
  }, [dispatch, useTelemetry, apiUrl]);

  return (
    <Form component="form" onSubmit={handleSubmit(onSubmit)}>
      <InstallationStepContainer
        activeStep={installationStep}
        steps={stepTitles}
        installationTitle={installTitle}
        showBackButton={installationStep > 0}
        onNextButtonClick={handleNextButtonClick}
        onBackButtonClick={handleBackButtonClick}
        nextButtonText={isSetupStep ? 'Create cluster' : 'Next'}
        nextButtonDisabled={!isValid}
        hasInfo={hasInfo}
        isProvisionStep={isProvisionStep}
      >
        {form}
        {info && <InstallationInfoCard info={info} />}
      </InstallationStepContainer>
    </Form>
  );
};

export default Provision;
