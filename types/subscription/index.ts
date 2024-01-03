export enum SaasPlans {
  Community = 'Community',
  Pro = 'Pro',
  Enterprise = 'Enterprise',
}

export interface License {
  id: string;
  plan: Plan;
  /**
   * Price id from stripe
   */
  priceId: string;
  licenseKey: string;
  created_at: Date;
  clusters: Cluster[];
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
