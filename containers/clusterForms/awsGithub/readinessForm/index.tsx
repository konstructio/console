import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  UseFormClearErrors,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import ControlledSelect from '../../../controlledFields/Select';
import Button from '../../../../components/button';
import Typography from '../../../../components/typography';
import ControlledTextField from '../../../controlledFields/TextField';

import { Message } from './readinessForm.styled';

export interface FormProps {
  control: Control;
  clearErrors: UseFormClearErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const DOMAIN_REGEX = new RegExp(/[a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}/);

const ReadinessForm: FunctionComponent<FormProps> = ({ control, setValue, trigger, watch }) => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isHostedZoneValid, setIsHostedZoneValid] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  useEffect(() => {
    if (isValidating) {
      setTimeout(() => {
        setIsValidating(false);
        setIsHostedZoneValid(true);
      }, 5000);
    }
  }, [isValidating]);

  useEffect(() => {
    const subscription = watch(({ profile, hostedZoneName }) =>
      setIsFormValid(profile && DOMAIN_REGEX.test(hostedZoneName)),
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (isHostedZoneValid) {
      setValue('isValid', true);
      trigger();
    }
  }, [isHostedZoneValid, setValue, trigger]);

  return (
    <>
      <ControlledSelect
        control={control}
        name="profile"
        rules={{ required: true }}
        label="Profile"
        required
        options={[{ value: 'default', label: 'default' }]}
      />
      <ControlledTextField
        control={control}
        name="hostedZoneName"
        label="Hosted zone name"
        required
        rules={{
          required: true,
          pattern: DOMAIN_REGEX,
        }}
      />
      <Controller
        control={control}
        name="isValid"
        rules={{ required: true }}
        render={({ field }) => <input {...field} type="hidden" />}
      />
      {isFormValid && (
        <Button
          color="secondary"
          onClick={() => {
            setShowMessage(true);
            setIsValidating(true);
          }}
        >
          Test
        </Button>
      )}

      {showMessage && (
        <Message>
          {isValidating ? (
            <CircularProgress size={20} />
          ) : (
            <CheckCircleOutlineIcon fontSize="small" htmlColor="#16A34A" />
          )}
          <Typography variant="body2">
            {isHostedZoneValid
              ? 'Accessibility test passed'
              : 'Verifying hosted zone name readiness....'}
          </Typography>
        </Message>
      )}
    </>
  );
};

export default ReadinessForm;
