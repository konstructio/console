import { renderHook } from '@testing-library/react';

import { useInstallation } from '../useInstallation';
import { InstallationType } from '../../types/redux';
import { GitProvider } from '../../types';
import {
  FormStep,
  INFO_INSTALLATION_TYPES,
  INFO_MARKETPLACE_INSTALLATION_TYPES,
  INSTALLATION_TYPE_API_KEYS,
  INSTALL_TYPE_STEPS,
  LOCAL_INSTALL_TITLES,
  LocalFormStep,
  MARKETPLACE_STEPS,
  MarketplaceFormStep,
} from '../../constants/installation';

describe('useInstallation', () => {
  describe('local installation', () => {
    test('Setup step', () => {
      const { result } = renderHook(() =>
        useInstallation(InstallationType.LOCAL, GitProvider.GITHUB, LocalFormStep.SETUP),
      );

      const {
        apiKeyInfo,
        info,
        installTitles,
        isAuthStep,
        isProvisionStep,
        isSetupStep,
        stepTitles,
      } = result.current;

      expect(apiKeyInfo).toBe(null);
      expect(stepTitles).toStrictEqual(INSTALL_TYPE_STEPS[InstallationType.LOCAL]);
      expect(installTitles).toBe(LOCAL_INSTALL_TITLES);
      expect(isAuthStep).toBe(false);
      expect(isProvisionStep).toBe(false);
      expect(isSetupStep).toBe(true);
      expect(info).toStrictEqual(
        INFO_INSTALLATION_TYPES[InstallationType.LOCAL][LocalFormStep.SETUP],
      );
    });

    test('Provisioning step', () => {
      const { result } = renderHook(() =>
        useInstallation(InstallationType.LOCAL, GitProvider.GITHUB, LocalFormStep.PROVISIONING),
      );

      const {
        apiKeyInfo,
        info,
        installTitles,
        isAuthStep,
        isProvisionStep,
        isSetupStep,
        stepTitles,
      } = result.current;

      expect(apiKeyInfo).toBe(null);
      expect(stepTitles).toStrictEqual(INSTALL_TYPE_STEPS[InstallationType.LOCAL]);
      expect(installTitles).toBe(LOCAL_INSTALL_TITLES);
      expect(isAuthStep).toBe(false);
      expect(isProvisionStep).toBe(true);
      expect(isSetupStep).toBe(false);
      expect(info).toBeUndefined();
    });

    test('Ready step', () => {
      const { result } = renderHook(() =>
        useInstallation(InstallationType.LOCAL, GitProvider.GITHUB, LocalFormStep.READY),
      );

      const {
        apiKeyInfo,
        info,
        installTitles,
        isAuthStep,
        isProvisionStep,
        isSetupStep,
        stepTitles,
      } = result.current;

      expect(apiKeyInfo).toBe(null);
      expect(stepTitles).toStrictEqual(INSTALL_TYPE_STEPS[InstallationType.LOCAL]);
      expect(installTitles).toBe(LOCAL_INSTALL_TITLES);
      expect(isAuthStep).toBe(false);
      expect(isProvisionStep).toBe(false);
      expect(isSetupStep).toBe(false);
      expect(info).toBeUndefined();
    });
  });

  describe('aws installation', () => {
    test('Authentication step', () => {
      const { result } = renderHook(() =>
        useInstallation(InstallationType.AWS, GitProvider.GITHUB, FormStep.AUTHENTICATION),
      );

      const { apiKeyInfo, info, isAuthStep, isProvisionStep, isSetupStep, stepTitles } =
        result.current;

      expect(apiKeyInfo).toBe(INSTALLATION_TYPE_API_KEYS[InstallationType.AWS]);
      expect(stepTitles).toStrictEqual(INSTALL_TYPE_STEPS[InstallationType.AWS]);
      expect(isAuthStep).toBe(true);
      expect(isProvisionStep).toBe(false);
      expect(isSetupStep).toBe(false);
      expect(info).toStrictEqual(
        INFO_INSTALLATION_TYPES[InstallationType.AWS][FormStep.AUTHENTICATION],
      );
    });

    test('Setup step', () => {
      const { result } = renderHook(() =>
        useInstallation(InstallationType.AWS, GitProvider.GITHUB, FormStep.SETUP),
      );

      const { isAuthStep, isProvisionStep, isSetupStep, stepTitles } = result.current;

      expect(stepTitles).toStrictEqual(INSTALL_TYPE_STEPS[InstallationType.AWS]);
      expect(isAuthStep).toBe(false);
      expect(isProvisionStep).toBe(false);
      expect(isSetupStep).toBe(true);
    });

    test('Provision step', () => {
      const { result } = renderHook(() =>
        useInstallation(InstallationType.AWS, GitProvider.GITHUB, FormStep.PROVISIONING),
      );

      const { isAuthStep, isProvisionStep, isSetupStep, stepTitles } = result.current;

      expect(stepTitles).toStrictEqual(INSTALL_TYPE_STEPS[InstallationType.AWS]);
      expect(isAuthStep).toBe(false);
      expect(isProvisionStep).toBe(true);
      expect(isSetupStep).toBe(false);
    });

    test('Ready step', () => {
      const { result } = renderHook(() =>
        useInstallation(InstallationType.AWS, GitProvider.GITHUB, FormStep.READY),
      );

      const { isAuthStep, isProvisionStep, isSetupStep, stepTitles } = result.current;

      expect(stepTitles).toStrictEqual(INSTALL_TYPE_STEPS[InstallationType.AWS]);
      expect(isAuthStep).toBe(false);
      expect(isProvisionStep).toBe(false);
      expect(isSetupStep).toBe(false);
    });
  });

  describe('civo installation', () => {
    test('Authentication step', () => {
      const { result } = renderHook(() =>
        useInstallation(InstallationType.CIVO, GitProvider.GITHUB, FormStep.AUTHENTICATION),
      );

      const { apiKeyInfo, info, isAuthStep, isProvisionStep, isSetupStep, stepTitles } =
        result.current;

      expect(apiKeyInfo).toBe(INSTALLATION_TYPE_API_KEYS[InstallationType.CIVO]);
      expect(stepTitles).toStrictEqual(INSTALL_TYPE_STEPS[InstallationType.CIVO]);
      expect(isAuthStep).toBe(true);
      expect(isProvisionStep).toBe(false);
      expect(isSetupStep).toBe(false);
      expect(info).toStrictEqual(
        INFO_INSTALLATION_TYPES[InstallationType.CIVO][FormStep.AUTHENTICATION],
      );
    });

    test('Setup step', () => {
      const { result } = renderHook(() =>
        useInstallation(InstallationType.CIVO, GitProvider.GITHUB, FormStep.SETUP),
      );

      const { isAuthStep, isProvisionStep, isSetupStep, stepTitles } = result.current;

      expect(stepTitles).toStrictEqual(INSTALL_TYPE_STEPS[InstallationType.CIVO]);
      expect(isAuthStep).toBe(false);
      expect(isProvisionStep).toBe(false);
      expect(isSetupStep).toBe(true);
    });

    test('Provision step', () => {
      const { result } = renderHook(() =>
        useInstallation(InstallationType.CIVO, GitProvider.GITHUB, FormStep.PROVISIONING),
      );

      const { isAuthStep, isProvisionStep, isSetupStep, stepTitles } = result.current;

      expect(stepTitles).toStrictEqual(INSTALL_TYPE_STEPS[InstallationType.CIVO]);
      expect(isAuthStep).toBe(false);
      expect(isProvisionStep).toBe(true);
      expect(isSetupStep).toBe(false);
    });

    test('Ready step', () => {
      const { result } = renderHook(() =>
        useInstallation(InstallationType.CIVO, GitProvider.GITHUB, FormStep.READY),
      );

      const { isAuthStep, isProvisionStep, isSetupStep, stepTitles } = result.current;

      expect(stepTitles).toStrictEqual(INSTALL_TYPE_STEPS[InstallationType.CIVO]);
      expect(isAuthStep).toBe(false);
      expect(isProvisionStep).toBe(false);
      expect(isSetupStep).toBe(false);
    });
  });

  describe('marketplace installation', () => {
    test('Authentication step', () => {
      const { result } = renderHook(() =>
        useInstallation(
          InstallationType.CIVO,
          GitProvider.GITHUB,
          MarketplaceFormStep.AUTHENTICATION,
          true,
        ),
      );

      const { apiKeyInfo, info, isAuthStep, isProvisionStep, isSetupStep, stepTitles } =
        result.current;

      expect(apiKeyInfo).toBe(INSTALLATION_TYPE_API_KEYS[InstallationType.CIVO]);
      expect(stepTitles).toStrictEqual(MARKETPLACE_STEPS);
      expect(isAuthStep).toBe(true);
      expect(isProvisionStep).toBe(false);
      expect(isSetupStep).toBe(false);
      expect(info).toStrictEqual(
        INFO_MARKETPLACE_INSTALLATION_TYPES[InstallationType.CIVO][FormStep.AUTHENTICATION],
      );
    });

    test('Setup step', () => {
      const { result } = renderHook(() =>
        useInstallation(InstallationType.CIVO, GitProvider.GITHUB, MarketplaceFormStep.SETUP, true),
      );

      const { isAuthStep, isProvisionStep, isSetupStep, stepTitles } = result.current;

      expect(stepTitles).toStrictEqual(MARKETPLACE_STEPS);
      expect(isAuthStep).toBe(false);
      expect(isProvisionStep).toBe(false);
      expect(isSetupStep).toBe(true);
    });

    test('Provision step', () => {
      const { result } = renderHook(() =>
        useInstallation(
          InstallationType.CIVO,
          GitProvider.GITHUB,
          MarketplaceFormStep.PROVISIONING,
          true,
        ),
      );

      const { isAuthStep, isProvisionStep, isSetupStep, stepTitles } = result.current;

      expect(stepTitles).toStrictEqual(MARKETPLACE_STEPS);
      expect(isAuthStep).toBe(false);
      expect(isProvisionStep).toBe(true);
      expect(isSetupStep).toBe(false);
    });

    test('Ready step', () => {
      const { result } = renderHook(() =>
        useInstallation(InstallationType.CIVO, GitProvider.GITHUB, MarketplaceFormStep.READY, true),
      );

      const { isAuthStep, isProvisionStep, isSetupStep, stepTitles } = result.current;

      expect(stepTitles).toStrictEqual(MARKETPLACE_STEPS);
      expect(isAuthStep).toBe(false);
      expect(isProvisionStep).toBe(false);
      expect(isSetupStep).toBe(false);
    });
  });
});
