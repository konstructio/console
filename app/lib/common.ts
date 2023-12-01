import axios from 'axios';

import { License } from '@/types/subscription';
import { EnvironmentVariables, FeatureFlag } from '@/types/config';

const BASE_URL = process.env.NEXTAUTH_URL;

export async function validateLicense() {
  try {
    const result = await axios.post<License>(`${BASE_URL}/api/proxy?target=ee`, {
      url: `/subscription/validate`,
    });

    return result?.data;
  } catch (error) {
    // supressing error. license not found
    return {} as License;
  }
}

export async function getFeatureFlas() {
  const result = await axios.get<{ flags: Record<FeatureFlag, boolean> }>(`${BASE_URL}/api/flags`);

  if ('error' in result) {
    // eslint-disable-next-line no-console
    console.log('Failed to fetch flags', result.error);
  }

  return result.data.flags;
}

export async function getEnvVars() {
  const result = await axios.get<EnvironmentVariables>(`${BASE_URL}/api/config`);

  if ('error' in result) {
    // eslint-disable-next-line no-console
    console.log('Failed to fetch configs', result.error);
  }

  return result.data;
}
