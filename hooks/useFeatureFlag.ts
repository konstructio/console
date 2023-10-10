import { useCallback, useMemo } from 'react';

import { useAppSelector } from '@/redux/store';
import { selectFeatureFlags } from '@/redux/selectors/featureFlags.selector';

const useFeatureFlag = (flagName = '') => {
  const { flags } = useAppSelector(selectFeatureFlags());

  const flag = useMemo(() => !!flags && !!flags[flagName], [flagName, flags]);

  const isFeatureEnabled = useCallback(() => {
    return flag;
  }, [flag]);

  return { isEnabled: isFeatureEnabled() };
};

export default useFeatureFlag;
