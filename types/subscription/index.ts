export enum SaasPlans {
  Community = 'Community',
  Pro = 'Pro',
  Enterprise = 'Enterprise',
}

export enum LicenseStatus {
  Active = 'active',
  UpToDate = 'up-todate',
  PaymentFailed = 'payment-failed',
  PaymentActionRequired = 'payment-action-required',
}

export interface License {
  id: string;
  plan: Plan;
  isActive: boolean;
  status: LicenseStatus;
  /**
   * Price id from stripe
   */
  priceId: string;
  licenseKey: string;
  created_at: Date;
  clusters: Cluster[];
  invoices: Invoice[];
}

export interface Plan {
  id: string;
  name: string;
  features: PlanFeatures[];
  licenses: License[];
}

export interface PlanFeatures {
  id: string;
  code: string;
  name: string;
  plan: Plan;
}

export interface Cluster {
  id: string;
  clusterType: string;
  isActive: boolean;
  clusterName: string;
  clusterID: string;
  domainName: string;
  environment: string;
  deletedAt: Date;
  createdAt: Date;
}

export interface CancelSubscriptionFields {
  projectIsComplete: boolean;
  kubefirstIsTooExpensive: boolean;
  kubefirstIsDifficult: boolean;
  didnotUsePaidPlan: boolean;
  didnotProviderFunctionality: boolean;
  other: boolean;
  description: string;
}

export interface ClusterUsage {
  clusterName: string;
  clusterID: string;
  clusterType: string;
  createdAt: Date;
  deletedAt: Date;
  hours: number;
  total: number;
}

export interface Invoice {
  id: string;
  hosted_invoice_url: string;
  status: string;
}
