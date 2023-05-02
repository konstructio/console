import {
  Control,
  FieldValues,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

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

export interface ClusterProps {
  apiUrl?: string;
  clusterName?: string;
}

export enum ProvisionStatus {
  DELETED = 'deleted',
  DELETING = 'deleting',
  ERROR = 'error',
  PROVISIONED = 'provisioned',
  PROVISIONING = 'provisioning',
}
