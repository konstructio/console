import { useCallback, useMemo } from 'react';

import { useAppSelector } from '@/redux/store';
import { InstallationType } from '@/types/redux';
import { selectFeatureFlags } from '@/redux/selectors/featureFlags.selector';

export function usePhysicalClustersPermissions(installationType?: InstallationType) {
  const {
    flags: {
      canProvisionAwsPhysicalClusters,
      canProvisionDOPhysicalClusters,
      canProvisionGCPPhysicalClusters,
      canProvisionVultrPhysicalClusters,
    },
  } = useAppSelector(selectFeatureFlags());

  // check if user has permission to provision physical clusters based on cloud provider,
  // otherwise default to true if no feature flag check
  const physicalClustersPermission = useMemo(
    (): Record<InstallationType, boolean> => ({
      [InstallationType.AWS]: canProvisionAwsPhysicalClusters,
      [InstallationType.DIGITAL_OCEAN]: canProvisionDOPhysicalClusters,
      [InstallationType.GOOGLE]: canProvisionGCPPhysicalClusters,
      [InstallationType.VULTR]: canProvisionVultrPhysicalClusters,
      [InstallationType.CIVO]: true,
      [InstallationType.LOCAL]: true,
      [InstallationType.AKAMAI]: true,
    }),
    [
      canProvisionAwsPhysicalClusters,
      canProvisionDOPhysicalClusters,
      canProvisionGCPPhysicalClusters,
      canProvisionVultrPhysicalClusters,
    ],
  );

  const getHasPermission = useCallback(() => {
    if (!installationType) {
      return false;
    }
    return physicalClustersPermission[installationType];
  }, [physicalClustersPermission, installationType]);

  // have to pass a function that fetches permissions since i am unable to pass a simple boolean from
  // physical clusters permissions indexed by installation type
  // encountered error - TypeError: getSnapshot is not a function
  return { hasPermissions: getHasPermission() };
}
