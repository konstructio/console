import React, { FunctionComponent } from 'react';
import { Control } from 'react-hook-form';

import SetupForm from './setupForm';
import PreparingForm from './preparingForm';
import ReadyForm from './ready';

enum LOCAL_FORM_STEPS {
  SETUP = 1,
  PREPARING = 2,
  READY = 3,
}

const LOCAL_FORMS_FLOW = {
  [LOCAL_FORM_STEPS.SETUP]: SetupForm,
  [LOCAL_FORM_STEPS.PREPARING]: PreparingForm,
  [LOCAL_FORM_STEPS.READY]: ReadyForm,
};

export interface LocalFormsProps {
  control: Control;
  step: number;
}

const LocalForms: FunctionComponent<LocalFormsProps> = ({ control, step }) => {
  const ActiveFormStep = LOCAL_FORMS_FLOW[step as LOCAL_FORM_STEPS];

  if (!ActiveFormStep) {
    return null;
  }

  return <ActiveFormStep control={control} />;
};

export default LocalForms;
