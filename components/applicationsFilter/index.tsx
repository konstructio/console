import React, { ComponentPropsWithoutRef, FunctionComponent, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import Row from '../row';
import Typography from '../typography';
import { IAutocompleteProps } from '../autocomplete';
import ControlledAutocomplete from '../controlledFields/autoComplete/AutoComplete';
import ControlledSelect from '../controlledFields/Select';

import {
  Container,
  Content,
  DropdownContainer,
  TargetContainer,
} from './applicationsFilter.styled';

import { VOLCANIC_SAND } from '@/constants/colors';
import { LabelValue } from '@/types';
import { noop } from '@/utils/noop';
import { ApplicationsState } from '@/redux/slices/applications.slice';

export interface ApplicationsFilterProps extends ComponentPropsWithoutRef<'div'> {
  searchOptions: IAutocompleteProps['options'];
  targetOptions: LabelValue[];
  clusterSelectOptions: LabelValue[];
  onFilterChange?: (filter: ApplicationsState['filter']) => void;
  defaultValues?: ApplicationsState['filter'];
}

const ApplicationsFilter: FunctionComponent<ApplicationsFilterProps> = ({
  searchOptions,
  targetOptions,
  clusterSelectOptions,
  onFilterChange = noop,
  defaultValues,
  ...rest
}) => {
  const { control, watch, setValue } = useForm<ApplicationsState['filter']>({
    defaultValues,
  });

  const target = watch('target');
  const cluster = watch('cluster');

  useEffect(() => {
    const subscription = watch(onFilterChange);
    return () => subscription.unsubscribe();
  }, [watch, onFilterChange]);

  useEffect(() => {
    // reset cluster value any time target is changed
    setValue('cluster', '');
    setValue('searchTerm', '');
  }, [target, setValue]);

  useEffect(() => {
    // reset search any time cluster is changed
    setValue('searchTerm', '');
  }, [cluster, setValue]);

  return (
    <Container {...rest}>
      <Content>
        <DropdownContainer>
          <TargetContainer>
            <Typography variant="labelLarge" color={VOLCANIC_SAND}>
              Target:
            </Typography>
            <ControlledSelect
              name="target"
              control={control}
              label=""
              rules={{ required: false }}
              options={targetOptions}
            />
          </TargetContainer>
          <Row>
            <ControlledSelect
              name="cluster"
              control={control}
              label=""
              rules={{ required: false }}
              options={clusterSelectOptions}
            />
          </Row>
        </DropdownContainer>
        <Row style={{ width: '248px' }}>
          <ControlledAutocomplete
            control={control}
            name="searchTerm"
            label=""
            rules={{ required: false }}
            options={searchOptions}
            sx={{
              '& .MuiAutocomplete-popupIndicator': { transform: 'none' },
            }}
          />
        </Row>
      </Content>
    </Container>
  );
};

export default styled(ApplicationsFilter)<ApplicationsFilterProps>``;
