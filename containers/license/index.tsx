import React, { FunctionComponent, useMemo } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { FieldValues, useFormContext } from 'react-hook-form';

import { BottomFormContainer, FormContainer, UList } from './license.styled';

import { EXCLUSIVE_PLUM, VOLCANIC_SAND } from '@/constants/colors';
import Button from '@/components/button';
import LearnMore from '@/components/learnMore';
import Typography from '@/components/typography';
import { useAppSelector } from '@/redux/store';
import ControlledPassword from '@/components/controlledFields/Password';

export interface LicenseProps {
  handleActivateLicense: (licenseKey: string) => void;
}

const License: FunctionComponent<LicenseProps> = ({ handleActivateLicense }) => {
  const { isLoading, license, error } = useAppSelector(({ subscription }) => subscription);

  const hasLicenseKey = useMemo<boolean>(() => !!license?.licenseKey, [license?.licenseKey]);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useFormContext<FieldValues>();

  const onSubmit = async ({ licenseKey }: FieldValues) => {
    handleActivateLicense(licenseKey);
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        {hasLicenseKey ? (
          <>
            <Typography
              variant="subtitle2"
              color={VOLCANIC_SAND}
            >{`You are on a ${license?.plan.name} Plan`}</Typography>
            <Typography variant="labelLarge" color={EXCLUSIVE_PLUM} sx={{ mt: 1, mb: 1 }}>
              License key
            </Typography>
            <Typography variant="body2" color={VOLCANIC_SAND}>
              {`${license?.licenseKey
                .slice(0, 4)
                .toUpperCase()}************************************`}
            </Typography>
          </>
        ) : (
          <ControlledPassword
            rules={{ required: true }}
            control={control}
            label="License key"
            name="licenseKey"
            required
            error={!!error}
            onErrorText={error}
            data-test-id="license-key"
          />
        )}
      </FormContainer>
      <BottomFormContainer>
        <LearnMore href="" description="Learn more about" linkTitle="your license key" />
        <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
          {isLoading && <CircularProgress size={20} sx={{ mr: '8px' }} />}
          {hasLicenseKey ? 'Update' : 'Activate'}
        </Button>
      </BottomFormContainer>
      {hasLicenseKey && (
        <>
          <FormContainer>
            <Typography variant="subtitle2" color={VOLCANIC_SAND} sx={{ mb: 1 }}>
              Cancel my subscription
            </Typography>

            <Typography variant="body2" color={VOLCANIC_SAND}>
              What to expect:
              <UList>
                <li>You will be downgraded to a Free Plan.</li>
                <li>
                  You will no longer be able to view and manage any physical clusters you may have
                  provisioned, this will only by possible via the kubefirst CLI.
                </li>
                <li>We will send you an email confirming that your account has been downgraded.</li>
                <li>You will still have access until the end of your current billing cycle.</li>
              </UList>
            </Typography>
          </FormContainer>
          <BottomFormContainer>
            <LearnMore
              href=""
              description="If you’re having any issues with kubefirst, "
              linkTitle="please reach out to us."
            />
            <Button variant="contained" color="error" onClick={() => console.log('todo')}>
              {isLoading && <CircularProgress size={20} sx={{ mr: '8px' }} />}
              Cancel subscription
            </Button>
          </BottomFormContainer>
        </>
      )}
    </Box>
  );
};

export default License;
