import React, { FunctionComponent } from 'react';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import { IoLogoSlack } from 'react-icons/io';

import { Background, Container, SocialIcons } from './footer.styled';

const Footer: FunctionComponent = () => {
  return (
    <Container>
      <Background />
      <SocialIcons>
        <a href="https://twitter.com/kubefirst" target="_blank" rel="noreferrer">
          <BsTwitter size={25} />
        </a>
        <a href="https://bit.ly/kubefirst-slack" target="_blank" rel="noreferrer">
          <IoLogoSlack size={25} />
        </a>
        <a href="https://github.com/kubefirst/kubefirst" target="_blank" rel="noreferrer">
          <BsGithub size={25} />
        </a>
      </SocialIcons>
    </Container>
  );
};

export default Footer;
