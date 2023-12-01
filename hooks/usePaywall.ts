import { useMemo } from 'react';

import { useAppSelector } from '@/redux/store';

export default function usePaywall() {
  const license = useAppSelector(({ subscription }) => subscription.license);

  const canUseFeature = (featureCode: string) => {
    if (license?.plan) {
      return !!license.plan.features.find(({ code }) => code === featureCode);
    }
  };

  const activeClusters = useMemo(
    () => license?.clusters.filter(({ isActive }) => isActive),
    [license?.clusters],
  );

  return {
    canUseFeature,
    activeClusters,
  };
}
