import { useMemo } from 'react';

import { selectFeatureFlags } from '@/redux/selectors/featureFlags.selector';
import { useAppSelector } from '@/redux/store';
import { FeatureFlag } from '@/types/config';

const useFeatureFlag = (flagName: FeatureFlag) => {
  const { flags } = useAppSelector(selectFeatureFlags());

  const isFeatureEnabled = useMemo(() => {
    if (flagName) {
      return flags?.[flagName];
    }

    return false;
  }, [flagName, flags]);

  return { isEnabled: isFeatureEnabled };
};

export default useFeatureFlag;
