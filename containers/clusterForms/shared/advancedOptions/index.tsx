import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import LearnMore from 'components/learnMore';

import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledSwitch from '../../../../components/controlledFields/Switch';
import { useAppSelector } from '../../../../redux/store';
import { FormFlowProps } from '../../../../types/provision';
import { InstallValues } from '../../../../types/redux';
import Typography from '../../../../components/typography';
import Checkbox from '../../../../components/controlledFields/Checkbox';
import { EXCLUSIVE_PLUM } from '../../../../constants/colors';

import { CheckboxContainer, Switch } from './advancedOptions.styled';

const AdvancedOptions: FunctionComponent<FormFlowProps<InstallValues>> = ({ control }) => {
  const [isAdvancedOptionsEnabled, setIsAdvancedOptionsEnabled] = useState<boolean>(false);
  const handleOnChangeSwitch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIsAdvancedOptionsEnabled(target.checked);
  };

  const { values } = useAppSelector(({ installation }) => ({
    values: installation.values,
  }));

  return (
    <>
      <Switch>
        <Typography variant="subtitle2">Advanced Options</Typography>
        <ControlledSwitch
          control={control}
          name="advancedOptions"
          rules={{
            required: false,
          }}
          onChange={handleOnChangeSwitch}
        />
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
          <LearnMore
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
