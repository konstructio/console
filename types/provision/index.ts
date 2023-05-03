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
  ID: string;
  CreationTimestamp: string;
  Status: string;
  InProgress: boolean;
  ClusterName: string;
  CloudProvider: string;
  CloudRegion: string;
  DomainName: string;
  ClusterID: string;
  ClusterType: string;
  AlertsEmail: string;
  GitProvider: string;
  GitOwner: string;
  GitUser: string;
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
