import { useCallback, useMemo } from 'react';

import { useAppSelector } from '@/redux/store';
import { selectFeatureFlags } from '@/redux/selectors/featureFlags.selector';
import { FeatureFlag } from '@/types/config';

const useFeatureFlag = (flagName?: FeatureFlag) => {
  const { flags } = useAppSelector(selectFeatureFlags());

  const flag = useMemo(() => {
    if (flagName) {
      return flags && flags[flagName];
    }
    return false;
  }, [flagName, flags]);

  const isFeatureEnabled = useCallback(() => {
    return flag;
  }, [flag]);

  return { isEnabled: isFeatureEnabled() };
};

export default useFeatureFlag;
