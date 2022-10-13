import styled from 'styled-components';

import Wave from '../../assets/wave.svg';

export const Background = styled.img.attrs({ src: Wave })`
  z-index: 1;
`;

export const Container = styled.div`
  bottom: 0;
  display: flex;
  position: absolute;
  width: 100%;
`;

export const SocialIcons = styled.div`
  position: absolute;
  width: 100%;
  bottom: 40px;
  left: 50%;
  z-index: 1;
  width: auto;

  & > a > svg {
    color: white;
    cursor: pointer;
    margin: 5px;
  }
`;
