export interface Plan {
  id: string;
  object: string;
  active: true;
  attributes: [];
  created: number;
  default_price: string;
  description: string;
  features: Array<{
    name: string;
  }>;
  images: Array<string>;
  livemode: false;
  metadata: {
    [key: string]: string;
  };
  name: string;
  tax_code: string;
  type: string;
  unit_label: string | null;
  updated: number;
  url: string | null;
}
