import React, { FunctionComponent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import LearnMore from '../../../../components/learnMore';
import Typography from '../../../../components/typography';
import Checkbox from '../../../../components/controlledFields/Checkbox';
import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledAutocomplete from '../../../../components/controlledFields/AutoComplete';
import ControlledRadioGroup from '../../../../components/controlledFields/radio/';
import { useAppSelector } from '../../../../redux/store';
import { InstallValues } from '../../../../types/redux';
import { ImageRepository } from '../../../../types/provision';
import { EXCLUSIVE_PLUM } from '../../../../constants/colors';

import { InputContainer } from './advancedOptions.styled';

const AdvancedOptions: FunctionComponent = () => {
  const [isCloudFlareSelected, setIsCloudFlareSelected] = useState<boolean>(false);

  const { values, installType } = useAppSelector(({ installation }) => installation);

  const { control } = useFormContext<InstallValues>();

  return (
    <>
      <LearnMore
        installType={installType}
        description="Learn more about"
        href=""
        linkTitle="customizing the GitOps template"
        withoutDivider
      />
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
      <InputContainer>
        <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
          By default kubefirst uses ssh to create your cluster check the below to use https instead{' '}
        </Typography>
        <Checkbox
          control={control}
          name="useHttps"
          label="Use https"
          rules={{
            required: false,
          }}
        />
      </InputContainer>
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
      <InputContainer>
        <Typography variant="labelLarge" color={EXCLUSIVE_PLUM}>
          Manage image repositories with
        </Typography>
        <ControlledRadioGroup
          control={control}
          name="imageRepository"
          rules={{
            required: false,
          }}
          options={[
            { label: 'Github Container Registry', value: ImageRepository.GITHUB },
            { label: 'AWS Elastic Container Registry (ECR)', value: ImageRepository.AWS },
          ]}
        />
      </InputContainer>
    </>
  );
};

export default AdvancedOptions;
