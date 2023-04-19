import React, { FC, ComponentPropsWithoutRef } from 'react';
import Link, { LinkProps } from 'next/link';
import styled from 'styled-components';

type NextLinkProps = Omit<LinkProps, 'onClick' | 'onTouchStart' | 'onMouseEnter'> &
  ComponentPropsWithoutRef<'div'>;

const NextLink: FC<NextLinkProps> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  legacyBehavior,
  children,
  ...rest
}) => (
  <div {...rest}>
    <Link {...{ href, as, replace, scroll, shallow, passHref, prefetch, locale, legacyBehavior }}>
      {children}
    </Link>
  </div>
);

export default styled(NextLink)`
  cursor: pointer;
`;
