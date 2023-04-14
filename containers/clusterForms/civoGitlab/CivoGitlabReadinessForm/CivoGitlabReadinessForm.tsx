import React, { useEffect, useState, forwardRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import Button from '../../../../components/button/Button';
import Typography from '../../../../components/typography/index';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import { DOMAIN_REGEX } from '../../../../constants/index';
import { GRANNY_APPLE_GREEN } from '../../../../constants/colors';
import { CivoInstallValues } from '../../../../types/redux/index';
import FormContainer from '../../../../components/formContainer/FormContainer';

export interface CivoGitlabReadinessFormProps {
  showMessage: boolean;
  isValidating: boolean;
  isHostedDomainValid: boolean;
  onTestButtonClick: () => void;
  onFormSubmit: (values: CivoInstallValues) => void;
}

const CivoGitlabReadinessForm = forwardRef<HTMLFormElement, CivoGitlabReadinessFormProps>(
  function CivoGitlabReadinessForm(props, ref) {
    const [formValid, setFormValid] = useState(false);

    const {
      showMessage,
      isValidating,
      isHostedDomainValid,
      onTestButtonClick,
      onFormSubmit,
      ...rest
    } = props;

    const { control, watch, setValue, trigger, handleSubmit } = useForm<CivoInstallValues>();

    useEffect(() => {
      const subscription = watch(({ hostedDomainName }) => {
        if (hostedDomainName) {
          setFormValid(DOMAIN_REGEX.test(hostedDomainName));
        }
      });

      return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
      if (isHostedDomainValid) {
        setValue('hostedDomainValid', true);
        trigger();
      }
    }, [isHostedDomainValid, setValue, trigger]);

    return (
      <FormContainer component="form" onSubmit={handleSubmit(onFormSubmit)} ref={ref} {...rest}>
        <ControlledTextField
          control={control}
          name="hostedDomainName"
          label="Hosted domain name"
          required
          rules={{
            required: true,
            pattern: DOMAIN_REGEX,
          }}
        />
        <Controller
          control={control}
          name="hostedDomainValid"
          rules={{ required: true }}
          render={({ field }) => <input {...field} type="hidden" />}
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
              {isHostedDomainValid
                ? 'Accessibility test passed'
                : 'Verifying hosted zone name readiness....'}
            </Typography>
          </Message>
        )}
      </FormContainer>
    );
  },
);

export default styled(CivoGitlabReadinessForm)`
  gap: 20px;
  padding: 30px 20px;

  ${Button} {
    margin-top: 20px;
  }
`;

const Message = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.volcanicSand};
  gap: 8px;
  margin-top: 24px;

  & > span > svg {
    color: #a1a1aa;
  }
`;
