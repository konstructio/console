import { FeatureFlag } from '../../types/config';

export const mockFeatureFlags: Record<FeatureFlag, boolean> = {
  [FeatureFlag.CLUSTER_MANAGEMENT]: false,
  [FeatureFlag.CLUSTER_PROVISIONING]: false,
  [FeatureFlag.GITOPS_CATALOG]: false,
  [FeatureFlag.MARKETPLACE]: false,
  [FeatureFlag.MULTICLUSTER_MANAGEMENT]: false,
  [FeatureFlag.PROVISION_AWS_PYHS_CLUSTERS]: false,
  [FeatureFlag.PROVISION_DO_PYHS_CLUSTERS]: false,
  [FeatureFlag.PROVISION_GCP_PYHS_CLUSTERS]: false,
  [FeatureFlag.PROVISION_VULTR_PYHS_CLUSTERS]: false,
};
