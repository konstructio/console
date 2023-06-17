import { FieldValues } from 'react-hook-form';

export interface GitOpsCatalogApp {
  name: string;
  display_name: string;
  secret_keys?: Array<{ name: string; label: string }>;
  image_url: string;
  description?: string;
  categories: Array<string>;
}

export interface GitOpsCatalogProps {
  app: GitOpsCatalogApp;
  clusterName: string;
  values?: FieldValues;
}
