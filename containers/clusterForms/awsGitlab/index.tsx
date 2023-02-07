import React, { FunctionComponent } from 'react';
import {
  Control,
  FieldValues,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

import { FormContainer } from '../../dashboard/dashboard.styled';
import ReadyForm from '../local/ready';
import ReadinessForm from '../awsGithub/readinessForm/index';

import SetupForm from './setupForm';
import PreparingForm from './preparingForm';

enum FORM_STEPS {
  READINESS = 1,
  SETUP = 2,
  PREPARING = 3,
  READY = 4,
}

const FORMS_FLOW = {
  [FORM_STEPS.READINESS]: ReadinessForm,
  [FORM_STEPS.SETUP]: SetupForm,
  [FORM_STEPS.PREPARING]: PreparingForm,
  [FORM_STEPS.READY]: ReadyForm,
};

export interface LocalFormsProps {
  control: Control;
  clearErrors: UseFormClearErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  step: number;
  trigger: UseFormTrigger<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const AwsGithubForms: FunctionComponent<LocalFormsProps> = ({
  control,
  clearErrors,
  setValue,
  step,
  trigger,
  watch,
}) => {
  const ActiveFormStep = FORMS_FLOW[step as FORM_STEPS];

  if (!ActiveFormStep) {
    return null;
  }

  return (
    <FormContainer shouldShowBackground={[FORM_STEPS.PREPARING, FORM_STEPS.READY].includes(step)}>
      <ActiveFormStep
        control={control}
        setValue={setValue}
        trigger={trigger}
        watch={watch}
        clearErrors={clearErrors}
      />
    </FormContainer>
  );
};

export default AwsGithubForms;
