import { useCallback, useMemo } from 'react';

import { useAppSelector } from '@/redux/store';
import { selectFeatureFlags } from '@/redux/selectors/featureFlags.selector';

const useFeatureFlag = (flagName = '') => {
  const { flags } = useAppSelector(selectFeatureFlags());

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // improper ts error saying flags cannot be indexed by type string
  const flag = useMemo(() => !!flags[flagName], [flagName, flags]);

  const isFeatureEnabled = useCallback(() => {
    return flag;
  }, [flag]);

  return { isEnabled: isFeatureEnabled() };
};

export default useFeatureFlag;
