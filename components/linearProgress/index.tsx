import React, { FunctionComponent } from 'react';
import LinearProgressMui, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { LIGHT_GREY, PRIMARY, VOLCANIC_SAND } from '../../constants/colors';

import { Container } from './linearProgress.styled';

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
  return (
    <Box sx={{ width: '512px' }}>
      <Box
        sx={{
          minWidth: 35,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle3" color={VOLCANIC_SAND}>
          Provisioning cluster:
        </Typography>
        <Typography variant="subtitle3" color={VOLCANIC_SAND}>{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
      <Box sx={{ width: '100%', mt: 1 }}>
        <LinearProgressMui
          variant="determinate"
          color="primary"
          {...props}
          sx={{
            'borderRadius': '55px',
            'background': LIGHT_GREY,
            'height': '9px',
            '> span': {
              background: `linear-gradient(270deg, ${PRIMARY} 0%, #81E2B4 100%)`,
              borderRadius: '55px',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export interface LinearProgressParams {
  progress: number;
}

const LinearProgress: FunctionComponent<LinearProgressParams> = ({ progress }) => {
  return (
    <Container>
      <LinearProgressWithLabel value={progress} />
    </Container>
  );
};

export default LinearProgress;
