import styled from 'styled-components';

import { media } from '../../theme/media';
import RayImage from '../../assets/k-ray.svg';

export const Container = styled.div`
  height: calc(100% - 60px);
  padding: 30px 60px;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  margin-top: 30px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Template = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const Ray = styled.img.attrs({ src: RayImage })`
  height: 500px;

  ${media.lessThan('md')`
    display: none;
  `}
`;
