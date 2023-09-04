import React, { FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import InstallationStepContainer from '../../components/installationStepContainer';
import InstallationInfoCard from '../../components/installationInfoCard';
import ErrorBanner from '../../components/errorBanner';
import Button from '../../components/button';
import { InstallationsSelection } from '../installationsSelection';
import { FormFlow } from '../clusterForms';
import AdvancedOptions from '../clusterForms/shared/advancedOptions';
import {
  clearError,
  setError,
  setInstallType,
  setInstallValues,
  setInstallationStep,
} from '../../redux/slices/installation.slice';
import { clearClusterState, clearValidation } from '../../redux/slices/api.slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { createCluster, getCloudRegions, resetClusterProgress } from '../../redux/thunks/api.thunk';
import { useInstallation } from '../../hooks/useInstallation';
import { InstallValues, InstallationType } from '../../types/redux';
import { GitProvider } from '../../types';
import { AUTHENTICATION_ERROR_MSG } from '../../constants';

import { AdvancedOptionsContainer, ErrorContainer, Form, FormContent } from './provision.styled';

const Provision: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const {
    authErrors,
    error,
    installType,
    isAuthenticationValid,
    isProvisioned,
    isClusterZero,
    installMethod,
    installationStep,
    gitProvider,
  } = useAppSelector(({ api, config, git, installation }) => ({
    installType: installation.installType,
    gitProvider: installation.gitProvider,
    installationStep: installation.installationStep,
    values: installation.values,
    error: installation.error,
    authErrors: git.errors,
    isAuthenticationValid: api.isAuthenticationValid,
    isProvisioned: api.isProvisioned,
    isClusterZero: config.isClusterZero,
    installMethod: config.installMethod,
  }));

  const isMarketplace = useMemo(() => installMethod?.includes('marketplace'), [installMethod]);

  const { stepTitles, installTitles, info, isAuthStep, isProvisionStep, isSetupStep } =
    useInstallation(
      installType as InstallationType,
      gitProvider as GitProvider,
      installationStep,
      !!isMarketplace,
    );

  const methods = useForm<InstallValues>({ mode: 'onChange' });
  const {
    formState: { isValid: isFormValid },
    getValues,
    trigger,
    handleSubmit,
  } = methods;

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
    if (installationStep === 0 && !isMarketplace) {
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
    isMarketplace,
    isProvisionStep,
    isProvisioned,
  ]);

  const handleGoNext = useCallback(() => {
    dispatch(setInstallationStep(installationStep + 1));
    dispatch(clearError());

    if (isProvisioned) {
      dispatch(clearClusterState());
    }
  }, [dispatch, installationStep, isProvisioned]);

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
    if (installationStep === 0 && !isMarketplace) {
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
    if (installationStep === 0 && !isMarketplace) {
      return <InstallationsSelection />;
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
          <FormFlow currentStep={isMarketplace ? installationStep + 1 : installationStep} />
        </FormContent>
        {isSetupStep && installType && ![InstallationType.LOCAL].includes(installType) && (
          <AdvancedOptionsContainer>
            <AdvancedOptions />
          </AdvancedOptionsContainer>
        )}
      </>
    );
  }, [
    installationStep,
    isMarketplace,
    hasInfo,
    isLastStep,
    isProvisionStep,
    error,
    authErrors,
    provisionCluster,
    isSetupStep,
    installType,
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
    if (isMarketplace && installMethod) {
      const [cloud] = installMethod.split('-') || [''];
      dispatch(setInstallType(cloud as InstallationType));
    }
  }, [dispatch, installMethod, installationStep, isMarketplace]);

  return (
    <FormProvider {...methods}>
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
              isMarketplace={isMarketplace}
              installationType={installType}
            />
          )}
        </InstallationStepContainer>
      </Form>
    </FormProvider>
  );
};

export default Provision;
