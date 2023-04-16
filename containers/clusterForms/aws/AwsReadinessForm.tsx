import React, { useEffect, useState, forwardRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import ControlledSelect from '../../../components/controlledFields/Select';
import Button from '../../../components/button/Button';
import Typography from '../../../components/typography/index';
import ControlledTextField from '../../../components/controlledFields/TextField';
import { DOMAIN_REGEX } from '../../../constants/index';
import { GRANNY_APPLE_GREEN } from '../../../constants/colors';
import { AwsInstallValues } from '../../../types/redux/index';

import { Form, Message } from './AwsReadinessForm.styled';

export interface AwsReadinessFormProps {
  showMessage: boolean;
  isValidating: boolean;
  isHostedZoneValid: boolean;
  onTestButtonClick: () => void;
  onFormSubmit: (values: AwsInstallValues) => void;
}

export const AwsReadinessForm = forwardRef<HTMLFormElement, AwsReadinessFormProps>(
  function AwsReadinessForm(props, ref) {
    const [formValid, setFormValid] = useState(false);

    const { showMessage, isValidating, isHostedZoneValid, onTestButtonClick, onFormSubmit } = props;

    const { control, watch, setValue, trigger, handleSubmit } = useForm<AwsInstallValues>();

    useEffect(() => {
      const subscription = watch(({ profile, hostedZoneName }) => {
        if (profile && hostedZoneName) {
          setFormValid(DOMAIN_REGEX.test(hostedZoneName));
        }
      });

      return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
      if (isHostedZoneValid) {
        setValue('hostedZoneValid', true);
        trigger();
      }
    }, [isHostedZoneValid, setValue, trigger]);

    return (
      <Form component="form" onSubmit={handleSubmit(onFormSubmit)} ref={ref}>
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
          name="hostedZoneValid"
          rules={{ required: true }}
          render={({ field: { value, ...rest } }) => (
            <input {...rest} value={value?.toString()} type="hidden" />
          )}
        />
        {formValid && (
          <Button color="primary" variant="outlined" onClick={onTestButtonClick}>
            Test
          </Button>
        )}

        {showMessage && (
          <Message>
            {isValidating ? (
              <CircularProgress size={20} />
            ) : (
              <CheckCircleOutlineIcon fontSize="small" htmlColor={GRANNY_APPLE_GREEN} />
            )}
            <Typography variant="body2">
              {isHostedZoneValid
                ? 'Accessibility test passed'
                : 'Verifying hosted zone name readiness....'}
            </Typography>
          </Message>
        )}
      </Form>
    );
  },
);
