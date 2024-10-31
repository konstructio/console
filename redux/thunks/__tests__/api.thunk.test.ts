import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { sortBy } from 'lodash';

import { makeStore } from '../../store';
import {
  createCluster,
  getCloudDomains,
  getCloudRegions,
  getClusters,
  getInstanceSizes,
  getRegionZones,
} from '../api.thunk';
import { mapClusterFromRaw } from '../../../utils/mapClustersFromRaw';
import { mockClusterResponse } from '../../../tests/mocks/mockClusterResponse';
import { clearResponseError } from '../../slices/api.slice';

describe('redux/thunks/api', () => {
  const reduxStore = makeStore();

  const mock = new MockAdapter(axios);

  beforeEach(() => {
    mock.reset();
    reduxStore.dispatch(clearResponseError());
  });

  test('createCluster - successful response', async () => {
    mock.onPost().reply(200);
    await reduxStore.dispatch(createCluster());

    const { isError, managementCluster } = reduxStore.getState().api;

    expect(isError).toBe(false);
    expect(managementCluster).toBe(undefined);
  });

  test('createCluster - unsuccessful response', async () => {
    mock.onPost().reply(400);
    await reduxStore.dispatch(createCluster());

    const { isError, responseError } = reduxStore.getState().api;

    expect(isError).toBe(true);
    expect(responseError).toBe('Request failed with status code 400');
  });

  test('getClusters - successful response', async () => {
    mock.onGet().reply(200, [mockClusterResponse]);

    const mockResult = mapClusterFromRaw(mockClusterResponse);

    await reduxStore.dispatch(getClusters());

    const { managementCluster } = reduxStore.getState().api;
    expect(managementCluster).toStrictEqual(mockResult);
  });

  test('getClusters - unsuccessful response - no clusters found', async () => {
    mock.onGet().reply(200, []);
    await reduxStore.dispatch(getClusters());

    const { isError, responseError } = reduxStore.getState().api;

    expect(isError).toBe(true);
    expect(responseError).toBe('No clusters found');
  });

  test('getClusters - unsuccessful response', async () => {
    mock.onGet().reply(400);
    await reduxStore.dispatch(getClusters());

    const { isError, responseError } = reduxStore.getState().api;

    expect(isError).toBe(true);
    expect(responseError).toBe('Request failed with status code 400');
  });

  test('getCloudRegions - successful response', async () => {
    const mockCloudRegions = ['LON1', 'FRA1', 'JAP1', 'GERM1'];
    mock.onPost().reply(200, { regions: mockCloudRegions });

    await reduxStore.dispatch(getCloudRegions({ values: {} })); // No need to set args as response is mocked.

    const { cloudRegions, isAuthenticationValid } = reduxStore.getState().api;

    expect(cloudRegions).toStrictEqual(sortBy(mockCloudRegions));
    expect(isAuthenticationValid).toBe(true);
  });

  test('getCloudRegions - unsuccessful response', async () => {
    mock.onPost().reply(400);

    await reduxStore.dispatch(getCloudRegions({ values: {} })); // No need to set args as response is mocked.

    const { isAuthenticationValid } = reduxStore.getState().api;

    expect(isAuthenticationValid).toBe(false);
  });

  test('getCloudDomains - successful response', async () => {
    const mockCloudDomains = ['kubefirst.com', 'kubefist.com', 'kubefunk.io'];
    mock.onPost().reply(200, { domains: mockCloudDomains });

    await reduxStore.dispatch(getCloudDomains({ region: 'USA' }));

    const { cloudDomains } = reduxStore.getState().api;

    expect(cloudDomains).toStrictEqual(sortBy(mockCloudDomains));
  });

  test('getCloudDomains - unsuccessful response', async () => {
    mock.onPost().reply(400);

    await reduxStore.dispatch(getCloudDomains({ region: 'USA' }));

    const { responseError } = reduxStore.getState().api;

    expect(responseError).toBe('Request failed with status code 400');
  });

  test('getInstanceSizes - successful response', async () => {
    const mockInstanceSizes = ['gx.small', 'gx.medium', 'gx.large'];
    mock.onPost().reply(200, { instance_sizes: mockInstanceSizes });

    await reduxStore.dispatch(getInstanceSizes({ region: 'USA' }));

    const { instanceSizes } = reduxStore.getState().api;

    expect(instanceSizes).toStrictEqual(mockInstanceSizes);
  });

  test('getInstanceSizes - unsuccessful response', async () => {
    mock.onPost().reply(400);

    await reduxStore.dispatch(getInstanceSizes({ region: 'USA' }));

    const { instanceSizes, responseError } = reduxStore.getState().api;

    expect(instanceSizes).toStrictEqual([]);
    expect(responseError).toBe('Request failed with status code 400');
  });

  test('getRegionZones - successful response', async () => {
    const mockCloudZones = ['in', 'the', 'zone'];
    mock.onPost().reply(200, { zones: mockCloudZones });

    await reduxStore.dispatch(getRegionZones({ region: 'USA' }));

    const { cloudZones } = reduxStore.getState().api;

    expect(cloudZones).toStrictEqual(mockCloudZones);
  });

  test('getRegionZones - unsuccessful response', async () => {
    mock.onPost().reply(400);

    await reduxStore.dispatch(getRegionZones({ region: 'USA' }));

    const { cloudZones, responseError } = reduxStore.getState().api;

    expect(cloudZones).toStrictEqual([]);
    expect(responseError).toBe('Request failed with status code 400');
  });
});
