import React, { FunctionComponent, ComponentPropsWithoutRef } from 'react';
import Link, { LinkProps } from 'next/link';

import { LinkContainer } from './nextLink.styled';

type NextLinkProps = Omit<LinkProps, 'onClick' | 'onTouchStart' | 'onMouseEnter'> &
  ComponentPropsWithoutRef<'div'>;

const NextLink: FunctionComponent<NextLinkProps> = ({
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
  <LinkContainer {...rest}>
    <Link {...{ href, as, replace, scroll, shallow, passHref, prefetch, locale, legacyBehavior }}>
      {children}
    </Link>
  </LinkContainer>
);

export default NextLink;
