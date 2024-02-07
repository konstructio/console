import { FieldValues } from 'react-hook-form';

export enum AppCategory {
  APP_MANAGEMENT = 'App Management',
  ARCHITECTURE = 'Architecture',
  CI_CD = 'CI/CD',
  DATABASE = 'Database',
  FIN_OPS = 'FinOps',
  INFRASTRUCTURE = 'Infrastructure',
  MONITORING = 'Monitoring',
  OBSERVABIILITY = 'Observability',
  SECURITY = 'Security',
  STORAGE = 'Storage',
  TESTING = 'Testing',
  QUEUEING = 'Queueing',
  KUBESHOP = 'Kubeshop',
  APPLICATIONS = 'Applications',
}

export interface GitOpsCatalogApp {
  name: string;
  display_name: string;
  secret_keys?: Array<{ name: string; label: string }>;
  config_keys?: Array<{ name: string; label: string }>;
  image_url: string;
  description?: string;
  category?: AppCategory;
}

export interface GitOpsCatalogProps {
  app: GitOpsCatalogApp;
  clusterName: string;
  values?: FieldValues;
}
