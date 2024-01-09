import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import { SaasPlans } from '@/types/subscription';

const subscriptionSelector = (state: RootState) => state.subscription;

export const selectHasLicenseKey = () =>
  createSelector(subscriptionSelector, ({ license }) => !!license?.licenseKey);

export const selectSubscriptionPlan = () =>
  createSelector(subscriptionSelector, ({ license }) => license?.plan?.name);

export const selectUpgrateLicenseDefinition = () =>
  createSelector(subscriptionSelector, ({ license }) => {
    if (license?.plan?.name === SaasPlans.Pro) {
      return {
        text: 'You’ve reached the 10 physical clusters limit.',
        description: 'Upgrade to an Enterprise plan to provision the number of clusters you need.',
        ctaText: 'Contact us to upgrade',
      };
    }

    if (!license?.licenseKey) {
      return {
        text: `You don't have a license key`,
        description: 'Get a Pro plan to provision up to 10 clusters.',
        ctaText: 'Get started',
      };
    }
  });
