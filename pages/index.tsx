import React, { FunctionComponent, useEffect, useState } from 'react';
import { PostHog } from 'posthog-node';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import useFeatureFlag from 'hooks/useFeatureFlag';

import { useAppDispatch } from '../redux/store';
import { setFeatureFlags } from '../redux/slices/featureFlags.slice';
import Dashboard from '../containers/dashboard';

export interface DashboardPageProps {
  flags: { [key: string]: boolean };
}

const DashboardPage: FunctionComponent<DashboardPageProps> = ({ flags }) => {
  const { replace } = useRouter();
  const dispatch = useAppDispatch();
  const { isEnabled: clusterManagementEnabled, flagsAreReady } =
    useFeatureFlag('cluster-management');

  useEffect(() => {
    dispatch(setFeatureFlags(flags));
  }, [dispatch, flags]);

  useEffect(() => {
    if (!flagsAreReady) {
      return;
    }

    if (!clusterManagementEnabled) {
      replace('/services');
    }
  }, [clusterManagementEnabled, flagsAreReady, replace]);

  return clusterManagementEnabled ? <Dashboard /> : null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { POSTHOG_KEY = '' } = process.env;

  let flags;
  try {
    const client = new PostHog(POSTHOG_KEY);
    flags = await client.getAllFlags('');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('An error occurred while getting feature flags', error);
    flags = [];
  }

  return {
    props: {
      flags,
    },
  };
};

export default DashboardPage;
