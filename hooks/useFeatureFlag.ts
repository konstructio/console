import { useCallback } from 'react';

import { selectFlags, selectFlagsLoaded } from '../redux/selectors/featureFlags.selector';
import { useAppSelector } from '../redux/store';

const useFeatureFlag = (flagName = '') => {
  const flag = useAppSelector(selectFlags(flagName));
  const flagsAreReady = useAppSelector(selectFlagsLoaded());

  const isFeatureEnabled = useCallback(() => {
    return flag;
  }, [flag]);

  return { isEnabled: isFeatureEnabled(), flagsAreReady };
};

export default useFeatureFlag;
