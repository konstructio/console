import React, { useEffect, useMemo } from 'react';
import { Slider as SliderMui, styled } from '@mui/material';
import moment from 'moment';
import { useConnector } from 'react-instantsearch-hooks-web';
import connectRange from 'instantsearch.js/es/connectors/range/connectRange';

import { PORT_GORE, PRIMARY, SALTBOX_BLUE } from '../../constants/colors';

import { SliderContainer, SliderTitle } from './kubefirstContent.styled';

const Slider = styled(SliderMui)(({ theme }) => ({
  'color': PRIMARY,
  'height': 4,
  'padding': '13px 0',
  '& .MuiSlider-thumb': {
    'height': 20,
    'width': 20,
    'backgroundColor': '#fff',
    '&:hover': {
      boxShadow: 'none',
    },
  },
  '& .MuiSlider-track': {
    height: 4,
  },
  '& .MuiSlider-rail': {
    color: PORT_GORE,
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 4,
  },
}));

export function useRangeSlider(props) {
  return useConnector(connectRange, props);
}

export function RangeSlider(props) {
  const { range, refine } = useRangeSlider(props);
  const [value, setValue] = React.useState<number[]>([range.min, range.max]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    refine(value);
  };

  const start = useMemo(() => Math.floor(moment.duration(value[0]).asMinutes()), [value]);
  const end = useMemo(() => Math.floor(moment.duration(value[1]).asMinutes()), [value]);

  useEffect(() => {
    if (range.min && range.max) {
      setValue([range.min, range.max]);
    }
  }, [range.max, range.min]);

  return (
    <SliderContainer>
      <SliderTitle variant="body3" color={SALTBOX_BLUE}>{`${start} - ${end} min`}</SliderTitle>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        defaultValue={value}
        min={range.min}
        max={range.max}
      />
    </SliderContainer>
  );
}
