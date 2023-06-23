import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import LearnMore from 'components/learnMore';

import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledSwitch from '../../../../components/controlledFields/Switch';
import Typography from '../../../../components/typography';
import { useAppSelector } from '../../../../redux/store';
import { FormFlowProps } from '../../../../types/provision';
import { InstallValues } from '../../../../types/redux';

import { Switch } from './advancedOptions.styled';

const AdvancedOptions: FunctionComponent<FormFlowProps<InstallValues>> = ({ control }) => {
  const [isAdvancedOptionsEnabled, setIsAdvancedOptionsEnabled] = useState<boolean>(false);
  const handleOnChangeSwitch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIsAdvancedOptionsEnabled(target.checked);
  };

  const { values, installType } = useAppSelector(({ installation }) => installation);

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
