import PopoverComponent from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import React, { FunctionComponent } from 'react';

export interface IPopoverProps {
  content: JSX.Element;
  popover: string;
}

const Popover: FunctionComponent<IPopoverProps> = ({ content, popover }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ height: 20 }}
      >
        {content}
      </Typography>
      <PopoverComponent
        className="popover"
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1, fontWeight: 200 }}>{popover}</Typography>
      </PopoverComponent>
    </div>
  );
};

export default Popover;
