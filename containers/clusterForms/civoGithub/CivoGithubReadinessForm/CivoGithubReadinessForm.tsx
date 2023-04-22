import React, { useEffect, useState, forwardRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ControlledPassword from '../../../../components/controlledFields/Password';
import Button from '../../../../components/button/Button';
import Typography from '../../../../components/typography/index';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import { DOMAIN_REGEX } from '../../../../constants/index';
import { GRANNY_APPLE_GREEN } from '../../../../constants/colors';
import { CivoInstallValues } from '../../../../types/redux/index';

import { Form, Message } from './CivoGithubReadinessForm.styled';

export interface CivoGithubReadinessFormProps {
  onFormSubmit: (values: CivoInstallValues) => void;
}

export const CivoGithubReadinessForm = forwardRef<HTMLFormElement, CivoGithubReadinessFormProps>(
  function CivoRadinessForm(props, ref) {

    const { onFormSubmit } = props;

    const { control,  handleSubmit } = useForm<CivoInstallValues>();

    return (
      <Form component="form" onSubmit={handleSubmit(onFormSubmit)} ref={ref}>
        <ControlledPassword
          control={control}
          name="civoToken"
          label="Civo API Key"
          helperText='you can retrieve your api key here: https://dashboard.civo.com/security'
          required
          rules={{
            required: true,
          }}
          // onBlur={onGithubTokenBlur}

          // error={!githubTokenValid && hasTokenValue}
          onErrorText="Invalid token."
        />
        <ControlledPassword
          control={control}
          name="githubToken"
          label="Github Token"
          helperText='your GitHub Personal Access Token'
          required
          rules={{
            required: true,
          }}
          // onBlur={onGithubTokenBlur}

          // error={!githubTokenValid && hasTokenValue}
          onErrorText="Invalid token."
        />
      </Form>
    );
  },
);
