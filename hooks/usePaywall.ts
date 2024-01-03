import { useMemo } from 'react';

import { useAppSelector } from '@/redux/store';
import { ClusterType } from '@/types/provision';

const CLUSTERS_LIMIT: { [key: string]: number } = { ['Pro']: 3, ['Enterprise']: 1000 };

export default function usePaywall() {
  const { license, plan } = useAppSelector(({ subscription }) => ({
    license: subscription.license,
    plan: subscription.license?.plan?.name,
  }));

  const canUseFeature = (featureCode: string) => {
    if (license?.plan) {
      if (featureCode == 'physicalClusters') {
        const clusterLimit = CLUSTERS_LIMIT[plan as string];

        return activeClusters && clusterLimit > activeClusters.length;
      }
      return !!license.plan.features.find(({ code }) => code === featureCode);
    }
  };

  const activeClusters = useMemo(
    () =>
      license?.clusters &&
      license?.clusters.filter(
        ({ isActive, clusterType }) => isActive && clusterType === ClusterType.WORKLOAD,
      ),
    [license?.clusters],
  );

  return {
    canUseFeature,
    activeClusters,
    plan,
  };
}
