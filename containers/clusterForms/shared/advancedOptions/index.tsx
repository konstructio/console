import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import LearnMore from 'components/learnMore';

import Typography from '../../../../components/typography';
import SwitchComponent from '../../../../components/switch';
import Checkbox from '../../../../components/controlledFields/Checkbox';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import { useAppSelector } from '../../../../redux/store';
import { FormFlowProps } from '../../../../types/provision';
import { InstallValues } from '../../../../types/redux';
import { EXCLUSIVE_PLUM } from '../../../../constants/colors';

import { CheckboxContainer, Switch } from './advancedOptions.styled';

const AdvancedOptions: FunctionComponent<FormFlowProps<InstallValues>> = ({ control }) => {
  const [isAdvancedOptionsEnabled, setIsAdvancedOptionsEnabled] = useState<boolean>(false);
  const [isCloudFlareSelected, setIsCloudFlareSelected] = useState<boolean>(false);

  const handleOnChangeSwitch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIsAdvancedOptionsEnabled(target.checked);
  };

  const { values, installType } = useAppSelector(({ installation }) => installation);

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
            <ControlledTextField
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
