export enum FeatureFlag {
  PROVISION_DO_PYHS_CLUSTERS = 'canProvisionDOPhysicalClusters',
  PROVISION_VULTR_PYHS_CLUSTERS = 'canProvisionVultrPhysicalClusters',
  PROVISION_GCP_PYHS_CLUSTERS = 'canProvisionGCPPhysicalClusters',
  PROVISION_AWS_PYHS_CLUSTERS = 'canProvisionAwsPhysicalClusters',
  MULTICLUSTER_MANAGEMENT = 'multicluster-management',
  GITOPS_CATALOG = 'gitops-catalog',
  CLUSTER_PROVISIONING = 'cluster-provisioning',
  CLUSTER_MANAGEMENT = 'cluster-managament',
  MARKETPLACE = 'marketplace',
  SHOW_CLOUDFLARE_CA_ISSUER = 'showCloudflareCaIssuerField',
  SAAS_SUBSCRIPTION = 'saas-subscription',
}

export interface EnvironmentVariables {
  disableAuth?: boolean;
  disableTelemetry?: boolean;
  isClusterZero: boolean;
  kubefirstVersion?: string;
  installMethod?: string;
  saasURL?: string;
}

export enum ClusterManagementTab {
  GRAPH_VIEW = 0,
  LIST_VIEW = 1,
}
