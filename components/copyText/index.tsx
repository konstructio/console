'use client';
import React, { ComponentPropsWithoutRef, FunctionComponent, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import Typography from '../typography';
import Tooltip from '../tooltip';

import { CopyButton } from './copyText.styled';

interface CopyTextProps extends ComponentPropsWithoutRef<'span'> {
  textToCopy: string;
}

const CopyText: FunctionComponent<CopyTextProps> = ({ textToCopy, ...rest }) => {
  const [copyLabel, setCopyLabel] = useState('Copy');

  const handleOnCopy = () => {
    setCopyLabel('Copied!');

    setTimeout(() => setCopyLabel('Copy'), 2000);
  };
  return (
    <span {...rest}>
      <Tooltip title={copyLabel} placement="top">
        <CopyToClipboard text={textToCopy} onCopy={handleOnCopy}>
          <CopyButton>
            <Typography variant="body2">{textToCopy}</Typography>
          </CopyButton>
        </CopyToClipboard>
      </Tooltip>
    </span>
  );
};

export default styled(CopyText)<CopyTextProps>``;
