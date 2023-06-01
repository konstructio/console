import { FunctionComponent, useEffect } from 'react';
import { PostHog } from 'posthog-node';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import useFeatureFlag from 'hooks/useFeatureFlag';

import { useAppDispatch } from '../redux/store';
import { setFeatureFlags } from '../redux/slices/featureFlags.slice';

export interface MainPageProps {
  flags: { [key: string]: boolean };
}

const MainPage: FunctionComponent<MainPageProps> = ({ flags }) => {
  const { push } = useRouter();

  const dispatch = useAppDispatch();
  const { isEnabled: clusterProvisioningEnabled, flagsAreReady } =
    useFeatureFlag('cluster-provisioning');

  useEffect(() => {
    dispatch(setFeatureFlags(flags));
  }, [dispatch, flags]);

  useEffect(() => {
    if (flagsAreReady) {
      if (clusterProvisioningEnabled) {
        push('/provision');
      }
    }
  }, [clusterProvisioningEnabled, flagsAreReady, push]);

  return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { POSTHOG_KEY = '', USE_TELEMETRY = '' } = process.env;

  let flags;
  try {
    const client = new PostHog(POSTHOG_KEY || 'phc_N4K5yJQsiIDBRK3X6rfrZlldK5uf2u1vgvlB82RADKn');
    flags = await client.getAllFlags('');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('An error occurred while getting feature flags', error);
    flags = [];
  }

  return {
    props: {
      flags,
      useTelemetry: USE_TELEMETRY === 'true',
    },
  };
};

export default MainPage;
