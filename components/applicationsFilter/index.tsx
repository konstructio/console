import React, { ComponentPropsWithoutRef, FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';

import Row from '../row';
import Typography from '../typography';
import { IAutocompleteProps } from '../autocomplete';
import Select from '../select';

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
import { Target } from '@/types/applications';

export interface ApplicationsFilterProps extends ComponentPropsWithoutRef<'div'> {
  searchOptions: IAutocompleteProps['options'];
  targetOptions: LabelValue[];
  clusterSelectOptions: LabelValue[];
  onFilterChange?: (filter: ApplicationsState['filter']) => void;
  defaultCluster: string;
}

const ApplicationsFilter: FunctionComponent<ApplicationsFilterProps> = ({
  clusterSelectOptions,
  defaultCluster,
  onFilterChange = noop,
  targetOptions,
  ...rest
}) => {
  const [target, setTarget] = useState<Target>(Target.CLUSTER);
  const [cluster, setCluster] = useState(defaultCluster);

  const handleChangeTarget = (value: Target) => {
    setTarget(value);
    setCluster('');

    onFilterChange({ target: value, cluster, searchTerm: '' });
  };

  const handleChangeCluster = (value: string) => {
    setCluster(value);
    onFilterChange({ target, cluster: value, searchTerm: '' });
  };

  useEffect(() => {
    if (defaultCluster && clusterSelectOptions.length) {
      onFilterChange({ target, cluster: defaultCluster, searchTerm: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container {...rest}>
      <Content>
        <DropdownContainer>
          <TargetContainer>
            <Typography variant="labelLarge" color={VOLCANIC_SAND}>
              Target:
            </Typography>
            <Select
              label=""
              options={targetOptions}
              value={target}
              onChange={(e) => handleChangeTarget(e.target.value as Target)}
              sx={{ width: '248px' }}
            />
          </TargetContainer>
          <Row>
            {defaultCluster && (
              <Select
                fullWidth
                label=""
                options={clusterSelectOptions}
                value={cluster}
                onChange={(e) => handleChangeCluster(e.target.value)}
                defaultValue={defaultCluster}
                sx={{ width: '248px' }}
              />
            )}
          </Row>
        </DropdownContainer>
        <Row style={{ width: '248px' }}>
          {/* <Autocomplete
            options={searchOptions}
            sx={{
              '& .MuiAutocomplete-popupIndicator': { transform: 'none' },
            }}
          /> */}
        </Row>
      </Content>
    </Container>
  );
};

export default styled(ApplicationsFilter)<ApplicationsFilterProps>``;
