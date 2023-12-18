import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { makeStore } from '../../store';
import { validateLicenseKey } from '../subscription.thunk';
import { mockUserLicense } from '../../../tests/mocks/mockUserLicense';
import { setLicense } from '../../slices/subscription.slice';

//ToDo: fix test
describe('redux/thunks/license', () => {
  const reduxStore = makeStore();

  beforeEach(() => {
    mock.reset();
    reduxStore.dispatch(setLicense(undefined));
  });

  const mock = new MockAdapter(axios);

  test.skip('validateLicenseKey - successful response', async () => {
    mock.reset();
    mock.onGet().reply(200, mockUserLicense);
    const { payload } = await reduxStore.dispatch(validateLicenseKey());

    const { license } = reduxStore.getState().license;

    expect(payload).toStrictEqual(mockUserLicense);
    expect(payload).toStrictEqual(license);
  });

  test.skip('validateLicenseKey - unsuccessful response', async () => {
    mock.reset();
    mock.onGet().reply(400);
    const { payload } = await reduxStore.dispatch(validateLicenseKey());

    const { license } = reduxStore.getState().license;

    expect(payload).toBe(undefined);
    expect(payload).toStrictEqual(license);
  });
});
