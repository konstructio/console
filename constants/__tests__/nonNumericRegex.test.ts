import { FIRST_CHAR_ALPHABETICAL } from '../index';

describe('constants/FIRST_CHAR_ALPHABETICAL', () => {
  it('passes', () => {
    expect(FIRST_CHAR_ALPHABETICAL.test('cluster-worker-1')).toBeTruthy();
    expect(FIRST_CHAR_ALPHABETICAL.test('c1uster-worker-1')).toBeTruthy();
    expect(FIRST_CHAR_ALPHABETICAL.test('cluster-w0rker-1')).toBeTruthy();
    expect(FIRST_CHAR_ALPHABETICAL.test('6luster-w0rker-1')).toBeFalsy();
    expect(FIRST_CHAR_ALPHABETICAL.test('-luster-w0rker-1')).toBeFalsy();
  });
});
