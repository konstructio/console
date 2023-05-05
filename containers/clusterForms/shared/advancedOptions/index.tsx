import React, { ChangeEvent, FunctionComponent, useState } from 'react';

import ControlledTextField from '../../../../components/controlledFields/TextField';
import ControlledSwitch from '../../../../components/controlledFields/Switch';
import { FormFlowProps } from '../../../../types/provision';
import { InstallValues } from '../../../../types/redux';
import Typography from '../../../../components/typography';

import { Switch } from './advancedOptions.styled';

const AdvancedOptions: FunctionComponent<FormFlowProps<InstallValues>> = ({ control }) => {
  const [isAdvancedOptionsEnabled, setIsAdvancedOptionsEnabled] = useState<boolean>(false);
  const handleOnChangeSwitch = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setIsAdvancedOptionsEnabled(target.checked);
  };

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
            name="gitopsTemplateRepo"
            label="GitOps template override"
            rules={{
              required: false,
            }}
          />
          <ControlledTextField
            control={control}
            name="gitopsTemplateBranch"
            label="GitOps template branch"
            rules={{
              required: false,
            }}
          />
        </>
      )}
    </>
  );
};

export default AdvancedOptions;
