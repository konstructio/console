export interface Flags {
  flags?: Record<string, string | boolean>;
}

export interface EnvironmentVariables {
  disableAuth?: boolean;
  disableTelemetry?: boolean;
  isClusterZero: boolean;
  kubefirstVersion?: string;
  installMethod?: string;
}

export enum ClusterManagementTab {
  LIST_VIEW = 0,
  GRAPH_VIEW = 1,
}
