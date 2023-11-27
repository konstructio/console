import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { makeStore } from '../../store';
import { mockFeatureFlags } from '../../../tests/mocks/mockFeatureFlags';
import { getFlags } from '../config.thunk';
import { setFlags } from '../../slices/featureFlags.slice';

describe('redux/thunks/config', () => {
  const reduxStore = makeStore();

  beforeEach(() => {
    reduxStore.dispatch(setFlags(mockFeatureFlags));
  });

  const mock = new MockAdapter(axios);

  test('getFlags - successful response', async () => {
    mock.reset();
    mock.onGet().reply(200, { flags: mockFeatureFlags });
    const { payload } = await reduxStore.dispatch(getFlags());

    const { flags } = reduxStore.getState().featureFlags;

    expect(payload).toStrictEqual(flags);
  });

  test('getFlags - unsuccessful response', async () => {
    mock.reset();
    mock.onGet().reply(400);
    const { payload } = await reduxStore.dispatch(getFlags());

    const { flags } = reduxStore.getState().featureFlags;

    expect(payload).toBe(undefined);
    expect(flags).toStrictEqual(mockFeatureFlags);
  });
});
