import React, { ComponentPropsWithoutRef, FunctionComponent } from 'react';
import styled from 'styled-components';

import Row from '../row';
import Typography from '../typography';
import { IAutocompleteProps } from '../autocomplete';
import { ISelectProps } from '../select';

import {
  ClusterSelect,
  Container,
  Content,
  DropdownContainer,
  StyledAutoComplete,
  TargetContainer,
  TargetSelect,
} from './applicationsFilter.styled';

import { VOLCANIC_SAND } from '@/constants/colors';
import { noop } from '@/utils/noop';
import { Target } from '@/types/applications';

export interface ApplicationsFilterProps extends ComponentPropsWithoutRef<'div'> {
  autoCompleteProps: Omit<IAutocompleteProps, 'ref'>;
  targetOptions: ISelectProps['options'];
  clusterSelectOptions: ISelectProps['options'];
  clusterSelectValue: string;
  targetValue: string;
  onTargetChange?: (target: Target) => void;
  onClusterSelectChange?: (value: string) => void;
}

const ApplicationsFilter: FunctionComponent<ApplicationsFilterProps> = ({
  autoCompleteProps,
  targetOptions,
  clusterSelectOptions,
  clusterSelectValue,
  targetValue,
  onTargetChange = noop,
  onClusterSelectChange = noop,
  ...rest
}) => (
  <Container {...rest}>
    <Content>
      <DropdownContainer>
        <TargetContainer>
          <Typography variant="labelLarge" color={VOLCANIC_SAND}>
            Target:
          </Typography>
          <TargetSelect
            value={targetValue}
            options={targetOptions}
            onChange={(e) => onTargetChange(e.target.value as Target)}
          />
        </TargetContainer>
        <Row>
          <ClusterSelect
            value={clusterSelectValue}
            options={clusterSelectOptions}
            onChange={(e) => onClusterSelectChange(e.target.value)}
          />
        </Row>
      </DropdownContainer>
      <StyledAutoComplete {...autoCompleteProps} />
    </Content>
  </Container>
);

export default styled(ApplicationsFilter)<ApplicationsFilterProps>``;
