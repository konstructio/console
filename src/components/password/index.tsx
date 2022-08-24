import React, { FunctionComponent, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import EyeIcon from '../../assets/eye.svg';
import EyeOffIcon from '../../assets/eye-off.svg';
import Input from '../input';

import { Container, CopyIcon, InputContainer } from './password.styled';

export interface IPasswordProps {
  canCopyValue?: boolean;
  value: string;
}

const Password: FunctionComponent<IPasswordProps> = ({ canCopyValue, value, ...rest }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Container {...rest}>
      <InputContainer showPassword={showPassword}>
        <Input
          type={showPassword ? 'text' : 'password'}
          value={value}
          readOnly
          icon={showPassword ? EyeOffIcon : EyeIcon}
          onIconClick={() => setShowPassword(!showPassword)}
        />
      </InputContainer>
      {canCopyValue && (
        <CopyToClipboard text={value}>
          <CopyIcon src={CopyIcon} />
        </CopyToClipboard>
      )}
    </Container>
  );
};

export default Password;
