import React from 'react';
import { Box, Tab as MuiTab, Tabs as MuiTabs, styled } from '@mui/material';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const Tabs = styled(MuiTabs)({
  'min-height': '40px',
  'height': '40px',
});

export const TabPanel = ({ children, value, index, ...other }: TabPanelProps) => {
  if (value !== index) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Box sx={{ mt: 3 }}>{children}</Box>
    </div>
  );
};

const Tab = styled((props) => <MuiTab disableRipple {...props} />)(({ theme }) => {
  return {
    'color': '#64748B',
    'textTransform': 'none',
    'marginRight': theme.spacing(3),
    'padding': 0,
    'min-width': 'fit-content',
    '&.Mui-selected': {
      color: '#000',
    },
    ...theme.typography.buttonSmall,
  };
});

export default Tab;
