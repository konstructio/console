import MockAdapter from 'axios-mock-adapter';

import { makeStore } from '../../../redux/store';
import { digitalOceanApi } from '../../../services/digitalOcean';
import { getDigitalOceanUser } from '../../../redux/thunks/digitalOcean.thunk';
import { mockDigiOceanUser } from '../../../tests/mocks/mockDigiOceanUser';

describe('redux/thunks/digiOcean', () => {
  const mock = new MockAdapter(digitalOceanApi);
  const reduxStore = makeStore();

  beforeEach(() => {
    mock.reset();
  });

  test('getDigitalOceanUser - successful responses', async () => {
    mock.onGet().reply(200, { account: mockDigiOceanUser });
    await reduxStore.dispatch(getDigitalOceanUser('token'));

    const { doUser, doStateLoading, doTokenValid, responseError } =
      reduxStore.getState().digitalOcean;

    expect(doUser).toStrictEqual(mockDigiOceanUser);
    expect(doTokenValid).toStrictEqual(true);
    expect(doStateLoading).toStrictEqual(false);
    expect(responseError).toStrictEqual(undefined);
  });

  test('getDigitalOceanUser - unsuccessful response', async () => {
    mock.onGet().reply(400);
    await reduxStore.dispatch(getDigitalOceanUser('token'));

    const { doUser, doStateLoading, doTokenValid, responseError } =
      reduxStore.getState().digitalOcean;

    expect(doUser).toStrictEqual(null);
    expect(doTokenValid).toStrictEqual(false);
    expect(doStateLoading).toStrictEqual(false);
    expect(responseError).toBe('Request failed with status code 400');
  });
});
