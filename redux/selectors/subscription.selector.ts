import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import { SaasPlans } from '@/types/subscription';

const subscriptionSelector = (state: RootState) => state.subscription;

export const selectHasLicenseKey = () =>
  createSelector(subscriptionSelector, ({ license }) => !!license?.licenseKey);

export const selectSubscriptionPlan = () =>
  createSelector(subscriptionSelector, ({ license }) => license?.plan?.name);

export const selectIsLicenseActive = () =>
  createSelector(subscriptionSelector, ({ license }) => !!license?.is_active);

export const selectPendingInvoice = () =>
  createSelector(
    subscriptionSelector,
    ({ license }) => license?.invoices && license?.invoices.find(({ status }) => status === 'open'),
  );

export const selectUpgradeLicenseDefinition = () =>
  createSelector(subscriptionSelector, ({ license }) => {
    if (!license?.licenseKey) {
      return {
        text: 'You’ve reached the workload clusters limit.',
        description: 'Upgrade to a Pro plan to provision the number of clusters you need.',
        ctaText: 'Upgrade to a Pro plan',
      };
    }

    if (license?.plan?.name === SaasPlans.Pro) {
      return {
        text: 'You’ve reached the workload clusters limit.',
        description: 'Upgrade to an Enterprise plan to provision the number of clusters you need.',
        ctaText: 'Contact us to upgrade',
      };
    }
  });

export const selectRequestByType = (requestType: string) =>
  createSelector(
    subscriptionSelector,
    ({ license }) =>
      license?.requests && license?.requests.find(({ type }) => type === requestType),
  );
