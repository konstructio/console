import { useCallback } from 'react';

import { useAppSelector } from '../redux/store';

const useFeatureFlag = (flagName = '') => {
  const { flag } = useAppSelector(({ featureFlags }) => ({
    flag: featureFlags.flags[flagName],
    loaded: featureFlags.loaded,
  }));

  const isFeatureEnabled = useCallback(() => {
    return flag;
  }, [flag]);

  return { isEnabled: isFeatureEnabled() };
};

export default useFeatureFlag;
