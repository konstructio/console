import React, { ChangeEvent, FunctionComponent, useMemo, useState } from 'react';
import LearnMore from 'components/learnMore';

import Typography from '../../../../components/typography';
import SwitchComponent from '../../../../components/switch';
import Checkbox from '../../../../components/controlledFields/Checkbox';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import ControlledRadio from '../../../../components/controlledFields/Radio';
import ControlledPassword from '../../../../components/controlledFields/Password';
import { useAppSelector } from '../../../../redux/store';
import { FormFlowProps } from '../../../../types/provision';
import { InstallValues, InstallationType } from '../../../../types/redux';
import { GitProvider } from '../../../../types';
import { EXCLUSIVE_PLUM } from '../../../../constants/colors';

import { CheckboxContainer, Switch } from './advancedOptions.styled';

const AdvancedOptions: FunctionComponent<FormFlowProps<InstallValues>> = ({ control }) => {
  const [isAdvancedOptionsEnabled, setIsAdvancedOptionsEnabled] = useState<boolean>(false);
  const [isCloudFlareSelected, setIsCloudFlareSelected] = useState<boolean>(false);

  const handleOnChangeSwitch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIsAdvancedOptionsEnabled(target.checked);
  };

  const { values, installType, gitProvider } = useAppSelector(({ installation }) => installation);

  const isGitHub = useMemo(() => gitProvider === GitProvider.GITHUB, [gitProvider]);
  const gitLabel = useMemo(() => (isGitHub ? 'GitHub' : 'GitLab'), [isGitHub]);

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
          {installType === InstallationType.AWS && (
            <CheckboxContainer>
              <Typography variant="body2" color={EXCLUSIVE_PLUM}>
                Manage image repositories with
              </Typography>
              <ControlledRadio
                control={control}
                rules={{
                  required: true,
                }}
                defaultValue="git"
                name="imageRepository"
                options={[
                  { label: `${gitLabel} Container Registry`, value: 'git' },
                  { label: 'AWS Elastic Container Registry (ECR)', value: 'ecr' },
                ]}
              />
            </CheckboxContainer>
          )}

          <ControlledAutocomplete
            control={control}
            name="dnsProvider"
            label="DNS provider"
            defaultValue="default"
            options={[
              { label: 'default', value: 'default' },
              { label: 'cloudflare', value: 'cloudflare' },
            ]}
            onChange={(value) => setIsCloudFlareSelected(value === 'cloudflare')}
            rules={{
              required: false,
            }}
          />
          {isCloudFlareSelected && (
            <ControlledPassword
              control={control}
              name="cloudflareToken"
              label="Cloudflare API key"
              required
              defaultValue={values?.gitopsTemplateBranch}
              rules={{
                required: true,
              }}
            />
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
