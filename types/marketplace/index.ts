export interface MarketplaceApp {
  name: string;
  secret_keys?: Array<string>;
  image_url: string;
  description?: string;
  categories: Array<string>;
}

export interface MarketplaceProps {
  app: MarketplaceApp;
  clusterName: string;
}
