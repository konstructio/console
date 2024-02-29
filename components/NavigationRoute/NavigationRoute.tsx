import React, { FunctionComponent, HTMLAttributeAnchorTarget, ReactNode } from 'react';
import Link from 'next/link';

import { BreakpointTooltip, MenuItem, Title } from './NavigationRoute.styled';

interface NavigationRouteProps {
  title: string;
  href?: string;
  menuItemIsActive?: boolean;
  icon?: ReactNode;
  target?: HTMLAttributeAnchorTarget;
  titleColor?: string;
  onMenuItemClick?: () => void;
}

const NavigationRoute: FunctionComponent<NavigationRouteProps> = ({
  menuItemIsActive,
  icon,
  href,
  title,
  target,
  titleColor,
  onMenuItemClick,
}) =>
  href ? (
    <Link href={href} target={target}>
      <BreakpointTooltip title={title} placement="right-end">
        <MenuItem isActive={menuItemIsActive} onClick={onMenuItemClick}>
          {icon}
          <Title variant="body1" color={titleColor}>
            {title}
          </Title>
        </MenuItem>
      </BreakpointTooltip>
    </Link>
  ) : (
    <BreakpointTooltip title={title} placement="right-end">
      <MenuItem isActive={menuItemIsActive} onClick={onMenuItemClick}>
        {icon}
        <Title variant="body1" color={titleColor}>
          {title}
        </Title>
      </MenuItem>
    </BreakpointTooltip>
  );

export default NavigationRoute;
