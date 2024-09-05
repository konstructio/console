import { useMemo } from 'react';

import { useAppSelector } from '@/redux/store';
import { SaasFeatures, SaasPlans } from '@/types/subscription';

export const CLUSTERS_LIMIT_FALLBACK: { [key: string]: number } = {
  [SaasPlans.Community]: 3,
  [SaasPlans.Pro]: 10,
  [SaasPlans.Enterprise]: Infinity,
};

export default function usePaywall() {
  const { clusterMap, license, plan } = useAppSelector(({ api, subscription }) => ({
    clusterMap: api.clusterMap,
    license: subscription.license,
    plan: subscription.license?.plan?.name,
  }));

  const canUseFeature = (featureCode: string): boolean => {
    if (license?.plan && license?.is_active) {
      const feature = license.plan.features.find(({ code }) => code === featureCode);

      if (featureCode === SaasFeatures.WorkloadClustersLimit) {
        const clusterLimit = feature?.data.limit || CLUSTERS_LIMIT_FALLBACK[plan as string];

        return !!activeClusters && clusterLimit > activeClusters.length;
      }

      return !!feature;
    }

    if (!license?.licenseKey) {
      // Gets and checks number of clusters to allow workload creation
      return (
        Object.keys(clusterMap).filter((clusterKey) => {
          const { status } = clusterMap[clusterKey];
          return clusterKey != 'draft' && status != 'deleted';
        }).length < CLUSTERS_LIMIT_FALLBACK[SaasPlans.Community]
      );
    }

    return false;
  };

  const activeClusters = useMemo(
    () => license?.clusters?.filter(({ isActive }) => isActive),
    [license?.clusters],
  );

  return {
    canUseFeature,
    activeClusters,
    plan,
  };
}
