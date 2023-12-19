import axios from 'axios';

import { License } from '@/types/subscription';
import { EnvironmentVariables, FeatureFlag } from '@/types/config';

const BASE_URL = process.env.NEXTAUTH_URL;

export async function validateLicense() {
  try {
    return (
      await axios.post<License>(`${BASE_URL}/api/proxy?target=ee`, {
        url: `/subscription/validate`,
      })
    ).data;
  } catch (error) {
    // supressing error. license not found
    return {} as License;
  }
}

export async function getFeatureFlags() {
  try {
    return (await axios.get<{ flags: Record<FeatureFlag, boolean> }>(`${BASE_URL}/api/flags`)).data
      .flags;
  } catch (error) {
    // supressing error to avoid ssr crashes
    // eslint-disable-next-line no-console
    console.log('unable to get feature flags');
    return {} as Record<FeatureFlag, boolean>;
  }
}

export async function getEnvVars() {
  try {
    return (await axios.get<EnvironmentVariables>(`${BASE_URL}/api/config`)).data;
  } catch (error) {
    // supressing error to avoid ssr crashes
    // eslint-disable-next-line no-console
    console.log('unable to get environment variables from server');
    return {} as EnvironmentVariables;
  }
}
