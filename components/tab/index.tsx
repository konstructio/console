import React from 'react';
import { styled, Tab as MuiTab, tabClasses } from '@mui/material';

import { ECHO_BLUE } from '../../constants/colors';

import { TabContainer } from './tab.styled';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const a11yProps = (index: number) => {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export const Tab = styled((props: { label: string }) => <MuiTab disableRipple {...props} />)(
  ({ theme }) => ({
    ...theme.typography.labelMedium,
    color: ECHO_BLUE,
    padding: 0,
    minWidth: 'auto',
    marginRight: '12px',
    [`&.${tabClasses.selected}`]: {
      color: theme.palette.secondary.main,
    },
  }),
);

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <TabContainer
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{ visibility: value === index ? 'visible' : 'hidden' }}
      {...other}
    >
      {children}
    </TabContainer>
  );
};

export default TabPanel;
