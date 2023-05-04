import React, { FunctionComponent } from 'react';
import { Divider } from '@mui/material';

import NextLink from '../../components/nextLink';

import { Text } from './learnMore.styled';

export interface LearnMoreProps {
  description: string;
  href: string;
  linkTitle: string;
}

const LearnMore: FunctionComponent<LearnMoreProps> = ({ description, href, linkTitle }) => {
  return (
    <>
      <Divider sx={{ m: '-20px', p: '8px 0' }} />
      <Text variant="labelLarge">
        {description}{' '}
        <NextLink href={href || 'https://docs.kubefirst.io'} target="_blank">
          {linkTitle}
        </NextLink>
      </Text>
    </>
  );
};

export default LearnMore;
