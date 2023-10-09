import { EnvMap } from '../redux/slices/environments.slice';
import { EnvironmentResponse } from '../types/provision';

import { mapEnvironmentFromRaw } from './mapEnvironmentFromRaw';

export function createEnvMap(environments: EnvironmentResponse[]): EnvMap {
  return environments.reduce<EnvMap>((acc, curVal) => {
    acc[curVal._id] = mapEnvironmentFromRaw(curVal);
    return acc;
  }, {});
}
