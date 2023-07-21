import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { AUTHENTICATION_ERROR_MSG } from '../../constants';
import { createCluster, getCloudRegions, resetClusterProgress } from '../../redux/thunks/api.thunk';
import InstallationStepContainer from '../../components/installationStepContainer';
import InstallationInfoCard from '../../components/installationInfoCard';
import { InstallationsSelection } from '../installationsSelection';
import {
  clearError,
  setError,
  setInstallType,
  setInstallValues,
  setInstallationStep,
} from '../../redux/slices/installation.slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useInstallation } from '../../hooks/useInstallation';
import { InstallValues, InstallationType } from '../../types/redux';
import { GitProvider } from '../../types';
import { clearClusterState, clearValidation } from '../../redux/slices/api.slice';
import AdvancedOptions from '../clusterForms/shared/advancedOptions';
import ErrorBanner from '../../components/errorBanner';
import Button from '../../components/button';

import { AdvancedOptionsContainer, ErrorContainer, Form, FormContent } from './provision.styled';

const Provision: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const {
    authErrors,
    error,
    installType,
    isAuthenticationValid,
    isClusterZero,
    installMethod,
    installationStep,
    gitProvider,
    values,
  } = useAppSelector(({ api, config, git, installation }) => ({
    installType: installation.installType,
    gitProvider: installation.gitProvider,
    installationStep: installation.installationStep,
    values: installation.values,
    error: installation.error,
    authErrors: git.errors,
    isAuthenticationValid: api.isAuthenticationValid,
    isClusterZero: config.isClusterZero,
    installMethod: config.installMethod,
  }));

  const { isProvisioned } = useAppSelector(({ api }) => api);

  const {
    stepTitles,
    formFlow: FormFlow,
    installTitles,
    info,
    isAuthStep,
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
    getValues,
    handleSubmit,
    setValue,
    trigger,
    watch,
    reset,
  } = useForm<InstallValues>({ mode: 'onChange' });

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
    if (installationStep === 0 && installType !== InstallationType.CIVO_MARKETPLACE) {
      return !!gitProvider && !!installType;
    } else if (isProvisionStep) {
      return isProvisioned;
    } else if (isAuthStep && isAuthenticationValid === false) {
      return true;
    }

    return isFormValid && !error && !authErrors.length;
  }, [
    authErrors.length,
    error,
    gitProvider,
    installType,
    installationStep,
    isAuthStep,
    isAuthenticationValid,
    isFormValid,
    isProvisionStep,
    isProvisioned,
  ]);

  const handleGoNext = useCallback(() => {
    dispatch(setInstallationStep(installationStep + 1));
    dispatch(clearError());
    dispatch(clearClusterState());
  }, [dispatch, installationStep]);

  const handleNextButtonClick = async () => {
    if (isAuthStep) {
      await dispatch(getCloudRegions(getValues()));
    } else {
      handleGoNext();
    }
  };

  const handleBackButtonClick = useCallback(() => {
    dispatch(clearValidation());
    dispatch(clearError());
    dispatch(setInstallationStep(installationStep - 1));
    trigger();
  }, [dispatch, installationStep, trigger]);

  const onSubmit = async (values: InstallValues) => {
    if (installationStep === 0 && installType !== InstallationType.CIVO_MARKETPLACE) {
      return handleNextButtonClick();
    }

    if (isValid) {
      await dispatch(setInstallValues(values));

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
    if (installationStep === 0 && installMethod !== InstallationType.CIVO_MARKETPLACE) {
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
            reset={reset}
            clusterName={values?.clusterName as string}
            domainName={values?.domainName as string}
          />
        </FormContent>
        {isSetupStep &&
          installType &&
          ![InstallationType.LOCAL, InstallationType.CIVO_MARKETPLACE].includes(installType) && (
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
    installMethod,
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
    reset,
    values?.clusterName,
    values?.domainName,
    isSetupStep,
    installType,
    stepTitles,
  ]);

  useEffect(() => {
    if (isAuthStep && isAuthenticationValid === false) {
      dispatch(setError({ error: AUTHENTICATION_ERROR_MSG }));
    } else if (isAuthStep && isAuthenticationValid) {
      handleGoNext();
    }
  }, [dispatch, handleGoNext, isAuthStep, isAuthenticationValid]);

  useEffect(() => {
    if (!isClusterZero) {
      push('/services');
    }
  }, [isClusterZero, push]);

  useEffect(() => {
    if (installMethod === InstallationType.CIVO_MARKETPLACE) {
      dispatch(setInstallType(InstallationType.CIVO_MARKETPLACE));
    }
  }, [dispatch, installMethod]);

  return (
    <Form component="form" onSubmit={handleSubmit(onSubmit)}>
      <InstallationStepContainer
        activeStep={installationStep}
        steps={stepTitles}
        installationTitle={installTitle}
        showBackButton={
          installationStep < stepTitles.length - 1 && installationStep > 0 && !isProvisionStep
        }
        onBackButtonClick={handleBackButtonClick}
        nextButtonText={isSetupStep ? 'Create cluster' : 'Next'}
        nextButtonDisabled={!isValid}
        hasInfo={hasInfo}
        isProvisionStep={isProvisionStep}
        showNextButton={installationStep < stepTitles.length - 1}
      >
        {form}
        {info && (
          <InstallationInfoCard
            info={info}
            isCivoMarketplace={installType === InstallationType.CIVO_MARKETPLACE}
          />
        )}
      </InstallationStepContainer>
    </Form>
  );
};

export default Provision;
