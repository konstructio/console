export interface MarketplaceApp {
  name: string;
  secret_keys?: Array<{ name: string; label: string }>;
  image_url: string;
  description?: string;
  categories: Array<string>;
}

export interface MarketplaceProps {
  app: MarketplaceApp;
  clusterName: string;
}
