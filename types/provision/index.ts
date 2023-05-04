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
  apiUrl?: string;
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
}
