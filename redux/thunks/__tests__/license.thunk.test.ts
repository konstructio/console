import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { makeStore } from '../../store';
import { getLicenseKey } from '../license.thunk';
import { mockUserLicense } from '../../../tests/mocks/mockUserLicense';
import { setLicense } from '../../slices/license.slice';

describe('redux/thunks/license', () => {
  const reduxStore = makeStore();

  beforeEach(() => {
    mock.reset();
    reduxStore.dispatch(setLicense(undefined));
  });

  const mock = new MockAdapter(axios);

  test('getLicenseKey - successful response', async () => {
    mock.onGet().reply(200, mockUserLicense);
    const { payload } = await reduxStore.dispatch(getLicenseKey());

    const { license } = reduxStore.getState().license;

    expect(payload).toStrictEqual(mockUserLicense);
    expect(payload).toStrictEqual(license);
  });

  test('getLicenseKey - unsuccessful response', async () => {
    mock.onGet().reply(400);
    const { payload } = await reduxStore.dispatch(getLicenseKey());

    const { license } = reduxStore.getState().license;

    expect(payload).toBe(undefined);
    expect(payload).toStrictEqual(license);
  });
});
