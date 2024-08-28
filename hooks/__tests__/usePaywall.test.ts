import { renderHook } from '@testing-library/react';

import usePaywall from '../usePaywall';
// eslint-disable-next-line import/order
import { SaasFeatures, SaasPlans } from '../../types/subscription';

jest.mock('@/redux/store', () => ({
  useAppSelector: jest.fn(),
}));

import { useAppSelector } from '../../redux/store';

describe('usePaywall', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct plan', () => {
    const mockState = {
      api: { clusterMap: {} },
      subscription: {
        license: { plan: { name: SaasPlans.Pro }, is_active: true, clusters: [] },
      },
    };

    (useAppSelector as jest.Mock).mockImplementation((selector) => selector(mockState));

    const { result } = renderHook(() => usePaywall());
    expect(result.current.plan).toBe(SaasPlans.Pro);
  });

  it('should return active clusters', () => {
    const activeClusters = [
      { id: 1, isActive: true },
      { id: 2, isActive: true },
    ];

    const mockState = {
      api: { clusterMap: {} },
      subscription: {
        license: { plan: { name: SaasPlans.Pro }, is_active: true, clusters: activeClusters },
      },
    };

    (useAppSelector as jest.Mock).mockImplementation((selector) => selector(mockState));

    const { result } = renderHook(() => usePaywall());
    expect(result.current.activeClusters).toEqual(activeClusters);
  });

  it('should return false if the feature is not available', () => {
    const mockState = {
      api: { clusterMap: {} },
      subscription: {
        license: { plan: { name: SaasPlans.Pro, features: [] }, is_active: true, clusters: [] },
      },
    };

    (useAppSelector as jest.Mock).mockImplementation((selector) => selector(mockState));

    const { result } = renderHook(() => usePaywall());
    expect(result.current.canUseFeature('some_feature')).toBe(false);
  });

  describe('pro plan', () => {
    it('should return true if the feature is available', () => {
      const featureCode = 'some_feature';
      const mockState = {
        api: { clusterMap: {} },
        subscription: {
          license: {
            plan: { name: SaasPlans.Pro, features: [{ code: featureCode }] },
            is_active: true,
            clusters: [],
          },
        },
      };

      (useAppSelector as jest.Mock).mockImplementation((selector) => selector(mockState));

      const { result } = renderHook(() => usePaywall());
      expect(result.current.canUseFeature(featureCode)).toBe(true);
    });

    it('should allow feature if cluster limit is not exceeded', () => {
      const activeClusters = [
        { id: 1, isActive: true },
        { id: 2, isActive: true },
      ];
      const featureCode = SaasFeatures.WorkloadClustersLimit;
      const mockState = {
        api: { clusterMap: {} },
        subscription: {
          license: {
            plan: {
              name: SaasPlans.Pro,
              features: [{ code: featureCode, data: { limit: 3 } }],
            },
            is_active: true,
            clusters: activeClusters,
          },
        },
      };

      (useAppSelector as jest.Mock).mockImplementation((selector) => selector(mockState));

      const { result } = renderHook(() => usePaywall());
      expect(result.current.canUseFeature(featureCode)).toBe(true);
    });

    it('should not allow feature if cluster limit has exceeded', () => {
      const activeClusters = [
        { id: 1, isActive: true },
        { id: 2, isActive: true },
        { id: 2, isActive: true },
        { id: 2, isActive: true },
      ];
      const featureCode = SaasFeatures.WorkloadClustersLimit;
      const mockState = {
        api: { clusterMap: {} },
        subscription: {
          license: {
            plan: {
              name: SaasPlans.Pro,
              features: [{ code: featureCode, data: { limit: 3 } }],
            },
            is_active: true,
            clusters: activeClusters,
          },
        },
      };

      (useAppSelector as jest.Mock).mockImplementation((selector) => selector(mockState));

      const { result } = renderHook(() => usePaywall());
      expect(result.current.canUseFeature(featureCode)).toBe(false);
    });
  });

  describe('community plan', () => {
    it('should enforce cluster limit for Community plan without license key', () => {
      const clusterMap = {
        cluster1: { id: 1 },
        cluster2: { id: 2 },
        cluster3: { id: 3 },
        cluster4: { id: 4 },
      };

      const mockState = {
        api: { clusterMap },
        subscription: {},
      };

      (useAppSelector as jest.Mock).mockImplementation((selector) => selector(mockState));

      const { result } = renderHook(() => usePaywall());
      expect(result.current.canUseFeature(SaasFeatures.WorkloadClustersLimit)).toBe(false);
    });

    it('should allow use feature for Community plan without license key when the clusters are less than 3', () => {
      const clusterMap = {
        cluster1: { id: 1 },
        cluster2: { id: 2 },
        draft: { id: 3 },
      };

      const mockState = {
        api: { clusterMap },
        subscription: {},
      };

      (useAppSelector as jest.Mock).mockImplementation((selector) => selector(mockState));

      const { result } = renderHook(() => usePaywall());
      expect(result.current.canUseFeature(SaasFeatures.WorkloadClustersLimit)).toBe(true);
    });
  });
});
