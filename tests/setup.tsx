import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider as ThemeProviderMUI } from '@mui/material/styles';

import { muiTheme } from '../theme/muiTheme';
import { theme } from '../theme';
import { ThemeProvider } from '../app/lib/styled-components';

// Custom render function that includes ThemeProvider
const customRender = (ui: React.ReactElement) => {
  return render(
    <ThemeProviderMUI theme={muiTheme}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </ThemeProviderMUI>,
  );
};

export default customRender;
