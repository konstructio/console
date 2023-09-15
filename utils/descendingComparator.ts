import { get } from 'lodash';

import { NestedKeyOf } from '../types';

export function descendingComparator<T extends object>(a: T, b: T, orderBy: NestedKeyOf<T>) {
  const aValue = get(a, orderBy);
  const bValue = get(b, orderBy);

  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}
