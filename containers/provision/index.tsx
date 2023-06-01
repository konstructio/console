import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { createCluster, getCloudRegions, resetClusterProgress } from '../../redux/thunks/api.thunk';
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
import { clearClusterState } from '../../redux/slices/api.slice';
import AdvancedOptions from '../clusterForms/shared/advancedOptions';
import ErrorBanner from '../../components/errorBanner';
import Button from '../../components/button';

import { AdvancedOptionsContainer, ErrorContainer, Form, FormContent } from './provision.styled';

export interface ProvisionProps {
  kubefirstVersion: string;
  useTelemetry: boolean;
}

const Provision: FunctionComponent<ProvisionProps> = ({ kubefirstVersion, useTelemetry }) => {
  const dispatch = useAppDispatch();
  const { installType, gitProvider, installationStep, values, error, authErrors } = useAppSelector(
    ({ git, installation }) => ({
      installType: installation.installType,
      gitProvider: installation.gitProvider,
      installationStep: installation.installationStep,
      values: installation.values,
      error: installation.error,
      authErrors: git.errors,
    }),
  );

  const { isProvisioned } = useAppSelector(({ api }) => api);

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
    } else if (isProvisionStep) {
      return isProvisioned;
    }
    return isFormValid && !error;
  }, [
    error,
    gitProvider,
    installType,
    installationStep,
    isFormValid,
    isProvisionStep,
    isProvisioned,
  ]);

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
          await provisionCluster();
          handleNextButtonClick();
        } catch (error) {
          //todo: error handling to be defined
        }
      } else {
        handleNextButtonClick();
      }
    }
  };

  const provisionCluster = useCallback(async () => {
    if (error) {
      dispatch(resetClusterProgress());
    }

    await dispatch(clearError());
    await dispatch(clearClusterState());
    await dispatch(createCluster()).unwrap();
  }, [dispatch, error]);

  const form = useMemo(() => {
    if (installationStep === 0) {
      return <InstallationsSelection steps={stepTitles} reset={reset} />;
    }

    return (
      <>
        <FormContent hasInfo={hasInfo} isLastStep={isLastStep} isProvisionStep={isProvisionStep}>
          {error || authErrors.length ? (
            <ErrorContainer>
              <ErrorBanner error={error || authErrors} />
              {isProvisionStep && (
                <Button variant="contained" color="primary" onClick={provisionCluster}>
                  Retry
                </Button>
              )}
            </ErrorContainer>
          ) : null}
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
        {isSetupStep && installType !== InstallationType.LOCAL && (
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
    installationStep,
    hasInfo,
    isLastStep,
    isProvisionStep,
    error,
    authErrors,
    provisionCluster,
    FormFlow,
    control,
    setValue,
    trigger,
    watch,
    values?.clusterName,
    values?.domainName,
    isSetupStep,
    installType,
    stepTitles,
    reset,
  ]);

  useEffect(() => {
    dispatch(setConfigValues({ isTelemetryEnabled: useTelemetry, kubefirstVersion }));

    return () => {
      dispatch(resetInstallState());
    };
  }, [dispatch, useTelemetry, kubefirstVersion]);

  useEffect(() => {
    if (isSetupStep) {
      dispatch(getCloudRegions());
    }
  }, [dispatch, isSetupStep]);

  return (
    <Form component="form" onSubmit={handleSubmit(onSubmit)}>
      <InstallationStepContainer
        activeStep={installationStep}
        steps={stepTitles}
        installationTitle={installTitle}
        showBackButton={
          installationStep <= stepTitles.length - 1 && installationStep > 0 && !isProvisionStep
        }
        onNextButtonClick={handleNextButtonClick}
        onBackButtonClick={handleBackButtonClick}
        nextButtonText={isSetupStep ? 'Create cluster' : 'Next'}
        nextButtonDisabled={!isValid}
        hasInfo={hasInfo}
        isProvisionStep={isProvisionStep}
        showNextButton={installationStep < stepTitles.length - 1}
      >
        {form}
        {info && <InstallationInfoCard info={info} />}
      </InstallationStepContainer>
    </Form>
  );
};

export default Provision;
