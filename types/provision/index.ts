import {
  Control,
  FieldValues,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

import { Row } from '../';

export interface FormFlowProps<T extends FieldValues> {
  currentStep: number;
  control: Control;
  clusterName: string;
  domainName: string;
  onFormSubmit?: (values: T) => void;
  setValue: UseFormSetValue<T>;
  step?: number;
  trigger: UseFormTrigger<T>;
  watch: UseFormWatch<T>;
}

export interface ClusterRequestProps {
  clusterName?: string;
}

export interface ClusterResponse {
  _id: string;
  creation_timestamp: string;
  status: string;
  in_progress: boolean;
  cluster_name: string;
  cloud_provider: string;
  cloud_region: string;
  domain_name: string;
  cluster_id: string;
  cluster_type: string;
  alerts_email: string;
  git_provider: string;
  git_owner: string;
  git_user: string;
  last_condition: string;
  install_tools_check: boolean;
  domain_liveness_check: boolean;
  state_store_creds_check: boolean;
  state_store_create_check: boolean;
  git_init_check: boolean;
  kbot_setup_check: boolean;
  gitops_ready_check: boolean;
  git_terraform_apply_check: boolean;
  gitops_pushed_check: boolean;
  cloud_terraform_apply_check: boolean;
  cluster_secrets_created_check: boolean;
  argocd_install_check: boolean;
  argocd_initialize_check: boolean;
  argocd_create_registry_check: boolean;
  argocd_delete_registry_check: boolean;
  vault_initialized_check: boolean;
  vault_terraform_apply_check: boolean;
  users_terraform_apply_check: boolean;
}

export enum ClusterStatus {
  DELETED = 'deleted',
  DELETING = 'deleting',
  ERROR = 'error',
  PROVISIONED = 'provisioned',
  PROVISIONING = 'provisioning',
}

export interface Cluster extends Row {
  adminEmail: string;
  clusterName: string;
  cloudProvider: string;
  cloudRegion: string;
  domainName: string;
  gitOwner: string;
  gitProvider: string;
  gitUser: string;
  gitToken?: string;
  type: string;
  creationDate?: string;
  status?: string;
  lastErrorCondition: string;
  checks: {
    install_tools_check: boolean;
    domain_liveness_check: boolean;
    state_store_creds_check: boolean;
    state_store_create_check: boolean;
    git_init_check: boolean;
    kbot_setup_check: boolean;
    gitops_ready_check: boolean;
    git_terraform_apply_check: boolean;
    gitops_pushed_check: boolean;
    cloud_terraform_apply_check: boolean;
    cluster_secrets_created_check: boolean;
    argocd_install_check: boolean;
    argocd_initialize_check: boolean;
    argocd_create_registry_check: boolean;
    argocd_delete_registry_check: boolean;
    vault_initialized_check: boolean;
    vault_terraform_apply_check: boolean;
    users_terraform_apply_check: boolean;
    [key: string]: boolean;
  };
}

export interface ClusterServices {
  name: string;
  default: boolean;
  description: string;
  image: string;
  links: Array<string>;
  status?: string;
}
