export interface Flags {
  'canProvisionDOPhysicalClusters'?: boolean;
  'canProvisionVultrPhysicalClusters'?: boolean;
  'canProvisionGCPPhysicalClusters'?: boolean;
  'canProvisionAWSPhysicalClusters'?: boolean;
  'multicluster-management'?: boolean;
  'gitops-catalog'?: boolean;
  'cluster-provisioning'?: boolean;
  'cluster-management'?: boolean;
  'marketplace'?: boolean;
}

export interface EnvironmentVariables {
  disableAuth?: boolean;
  disableTelemetry?: boolean;
  isClusterZero: boolean;
  kubefirstVersion?: string;
  installMethod?: string;
}

export enum ClusterManagementTab {
  GRAPH_VIEW = 0,
  LIST_VIEW = 1,
}
