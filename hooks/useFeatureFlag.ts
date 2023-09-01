import { useCallback, useMemo } from 'react';

import { useAppSelector } from '../redux/store';

const useFeatureFlag = (flagName = '') => {
  const { flags } = useAppSelector(({ featureFlags }) => ({
    flags: featureFlags.flags,
    loaded: featureFlags.loaded,
  }));

  const flag = useMemo(() => !!flags[flagName], [flagName, flags]);

  const isFeatureEnabled = useCallback(() => {
    return flag;
  }, [flag]);

  return { isEnabled: isFeatureEnabled() };
};

export default useFeatureFlag;
