import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { sortBy } from 'lodash';

import { makeStore } from '../../store';
import {
  createCluster,
  createWorkloadCluster,
  deleteCluster,
  getCloudDomains,
  getCloudRegions,
  getClusters,
  getInstanceSizes,
  getRegionZones,
} from '../api.thunk';
import { mapClusterFromRaw } from '../../../utils/mapClustersFromRaw';
import { mockClusterResponse } from '../../../tests/mocks/mockClusterResponse';
import {
  clearResponseError,
  setClusterMap,
  setManagementCluster,
  setPresentedClusterName,
} from '../../slices/api.slice';
import { ClusterCreationStep, ClusterStatus } from '../../../types/provision';
import { ClusterCache } from '../../../types/redux';
import { RESERVED_DRAFT_CLUSTER_NAME } from '../../../constants';

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

  test('createWorkloadCluster - unsuccessful response - missing management cluster', async () => {
    mock.onPost().reply(200); // set to 200 to show that thunk is throwing internally
    await reduxStore.dispatch(createWorkloadCluster());

    const { isError, responseError, managementCluster } = reduxStore.getState().api;

    expect(isError).toBe(true);
    expect(responseError).toStrictEqual('missing management cluster');
    expect(managementCluster).toBe(undefined);
  });

  test('createWorkloadCluster - unsuccessful response - missing draft cluster', async () => {
    mock.onPost().reply(200); // set to 200 to show that thunk is throwing internally

    const { managementCluster } = mapClusterFromRaw(mockClusterResponse);
    reduxStore.dispatch(setManagementCluster(managementCluster));

    await reduxStore.dispatch(createWorkloadCluster());

    const { isError, responseError, managementCluster: manCluster } = reduxStore.getState().api;

    expect(isError).toBe(true);
    expect(responseError).toStrictEqual('missing draft cluster');
    expect(manCluster).toStrictEqual(managementCluster);
  });

  test('createWorkloadCluster - successful response ', async () => {
    const mockCreatedClusterId = 'superDopeId';
    mock.onPost().reply(200, { cluster_id: mockCreatedClusterId });

    const { managementCluster } = mapClusterFromRaw(mockClusterResponse);
    const { workloadClusters } = managementCluster;

    const mockClusterCache: ClusterCache = {
      [RESERVED_DRAFT_CLUSTER_NAME]: workloadClusters[0],
    };

    reduxStore.dispatch(setManagementCluster(managementCluster));
    reduxStore.dispatch(setClusterMap(mockClusterCache));

    await reduxStore.dispatch(createWorkloadCluster());

    const {
      isError,
      responseError,
      managementCluster: manCluster,
      clusterMap,
      clusterCreationStep,
    } = reduxStore.getState().api;

    const provisioningCluster = clusterMap[workloadClusters[0].clusterName];

    expect(responseError).toBe(undefined);
    expect(isError).toBe(false);
    expect(manCluster).toStrictEqual(managementCluster);
    expect(provisioningCluster).toBeDefined();
    expect(provisioningCluster.clusterId).toStrictEqual(mockCreatedClusterId);
    expect(provisioningCluster.status).toStrictEqual(ClusterStatus.PROVISIONING);
    expect(clusterCreationStep).toStrictEqual(ClusterCreationStep.DETAILS);
  });

  test('getClusters - successful response', async () => {
    mock.onGet().reply(200, [mockClusterResponse]);

    const mockResult = mapClusterFromRaw(mockClusterResponse);

    await reduxStore.dispatch(getClusters());

    const { managementCluster, clusterMap } = reduxStore.getState().api;
    const { boundEnvironments } = reduxStore.getState().environments;

    expect(managementCluster).toStrictEqual(mockResult.managementCluster);
    expect(clusterMap).toStrictEqual(mockResult.clusterCache);
    expect(boundEnvironments).toStrictEqual(mockResult.envCache);
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

  test('deleteCluster - unsuccessful response', async () => {
    mock.onGet().reply(200, [mockClusterResponse]);
    mock.onDelete().reply(400);

    const {
      managementCluster: { workloadClusters },
    } = mapClusterFromRaw(mockClusterResponse);

    const [{ clusterName }] = workloadClusters;

    await reduxStore.dispatch(getClusters());
    reduxStore.dispatch(setPresentedClusterName(undefined));
    await reduxStore.dispatch(deleteCluster(clusterName));

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
