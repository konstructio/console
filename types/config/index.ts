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
  GRAPH_VIEW = 0,
  LIST_VIEW = 1,
}
