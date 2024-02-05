import { ManagementCluster } from '@/types/provision';
import { InstallationType } from '@/types/redux';

export function getCloudProviderAuth(cluster: ManagementCluster): {
  key?: string;
  value?: Record<string, string>;
} {
  const installType = cluster.cloudProvider;
  const key = installType === InstallationType.DIGITAL_OCEAN ? 'do' : installType;
  return { key, value: key ? (cluster[`${key}_auth`] as Record<string, string>) : undefined };
}
