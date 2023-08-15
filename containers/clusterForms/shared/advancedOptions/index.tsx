import React, { ChangeEvent, FunctionComponent, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Required } from '../../../../components/textField/textField.styled';
import LearnMore from '../../../../components/learnMore';
import Typography from '../../../../components/typography';
import SwitchComponent from '../../../../components/switch';
import Checkbox from '../../../../components/controlledFields/Checkbox';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledRadio from '../../../../components/controlledFields/radio/';
import { useAppSelector } from '../../../../redux/store';
import { InstallValues, InstallationType } from '../../../../types/redux';
import { GitProvider } from '../../../../types';
import { EXCLUSIVE_PLUM } from '../../../../constants/colors';

import { CheckboxContainer, Switch } from './advancedOptions.styled';

const AdvancedOptions: FunctionComponent = () => {
  const [isAdvancedOptionsEnabled, setIsAdvancedOptionsEnabled] = useState<boolean>(false);

  const handleOnChangeSwitch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIsAdvancedOptionsEnabled(target.checked);
  };

  const { values, installType, gitProvider } = useAppSelector(({ installation }) => installation);

  const isGitHub = useMemo(() => gitProvider === GitProvider.GITHUB, [gitProvider]);
  const gitLabel = useMemo(() => (isGitHub ? 'GitHub' : 'GitLab'), [isGitHub]);

  const { control } = useFormContext<InstallValues>();
  const isAwsInstallation = useMemo(() => installType === InstallationType.AWS, [installType]);

  return (
    <>
      <Switch>
        <Typography variant="subtitle2">Advanced Options</Typography>
        <SwitchComponent name="advancedOptions" onChange={handleOnChangeSwitch} />
      </Switch>
      {isAdvancedOptionsEnabled && (
        <>
          <ControlledTextField
            control={control}
            name="gitopsTemplateUrl"
            label="GitOps template override"
            defaultValue={values?.gitopsTemplateUrl}
            rules={{
              required: false,
            }}
          />
          <ControlledTextField
            control={control}
            name="gitopsTemplateBranch"
            label="GitOps template branch"
            defaultValue={values?.gitopsTemplateBranch}
            rules={{
              required: false,
            }}
          />
          <CheckboxContainer>
            <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
              By default kubefirst uses ssh to create your cluster check the below to use https
              instead{' '}
            </Typography>
            <Checkbox
              control={control}
              name="useHttps"
              label="Use https"
              rules={{
                required: false,
              }}
            />
          </CheckboxContainer>
          {isAwsInstallation && (
            <CheckboxContainer>
              <Typography
                variant="body2"
                color={EXCLUSIVE_PLUM}
                sx={{ display: 'flex', gap: '4px' }}
              >
                Manage image repositories with <Required>*</Required>
              </Typography>
              <ControlledRadio
                control={control}
                rules={{
                  required: true,
                }}
                name="imageRepository"
                options={[
                  { label: `${gitLabel} Container Registry`, value: 'git' },
                  { label: 'AWS Elastic Container Registry (ECR)', value: 'ecr' },
                ]}
              />
            </CheckboxContainer>
          )}
          <LearnMore
            installType={installType}
            description="Learn more about"
            href=""
            linkTitle="customizing the GitOps template"
          />
        </>
      )}
    </>
  );
};

export default AdvancedOptions;
