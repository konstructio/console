import { useCallback, useMemo } from 'react';

import { useAppSelector } from '@/redux/store';
import { InstallationType } from '@/types/redux';
import { selectFeatureFlags } from '@/redux/selectors/featureFlags.selector';
import { FeatureFlag } from '@/types/config';

export function usePhysicalClustersPermissions(installationType?: InstallationType) {
  const { flags } = useAppSelector(selectFeatureFlags());
  const canProvisionAwsPhysicalClusters = flags[FeatureFlag.PROVISION_AWS_PYHS_CLUSTERS];
  const canProvisionAzurePhysicalClusters = flags[FeatureFlag.PROVISION_AZURE_PYHS_CLUSTERS];
  const canProvisionDOPhysicalClusters = flags[FeatureFlag.PROVISION_DO_PYHS_CLUSTERS];
  const canProvisionGCPPhysicalClusters = flags[FeatureFlag.PROVISION_GCP_PYHS_CLUSTERS];
  const canProvisionVultrPhysicalClusters = flags[FeatureFlag.PROVISION_VULTR_PYHS_CLUSTERS];

  // check if user has permission to provision physical clusters based on cloud provider,
  // otherwise default to true if no feature flag check
  const physicalClustersPermission = useMemo(
    (): Record<InstallationType, boolean> => ({
      [InstallationType.AWS]: canProvisionAwsPhysicalClusters,
      [InstallationType.AZURE]: canProvisionAzurePhysicalClusters,
      [InstallationType.DIGITAL_OCEAN]: canProvisionDOPhysicalClusters,
      [InstallationType.GOOGLE]: canProvisionGCPPhysicalClusters,
      [InstallationType.VULTR]: canProvisionVultrPhysicalClusters,
      [InstallationType.CIVO]: true,
      [InstallationType.LOCAL]: true,
      [InstallationType.AKAMAI]: true,
    }),
    [
      canProvisionAwsPhysicalClusters,
      canProvisionAzurePhysicalClusters,
      canProvisionDOPhysicalClusters,
      canProvisionGCPPhysicalClusters,
      canProvisionVultrPhysicalClusters,
    ],
  );

  const getHasPermission = useCallback(() => {
    if (!installationType) {
      return false;
    }

    return installationType ? physicalClustersPermission[installationType] : false;
  }, [physicalClustersPermission, installationType]);

  // have to pass a function that fetches permissions since i am unable to pass a simple boolean from
  // physical clusters permissions indexed by installation type
  // encountered error - TypeError: getSnapshot is not a function
  return { hasPermissions: getHasPermission() };
}
