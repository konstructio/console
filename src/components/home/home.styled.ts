import styled from 'styled-components';

import { media } from '../../theme/media';
import RayImage from '../../assets/k-ray.svg';

export const Container = styled.div`
  color: ${(props) => props.theme.colors.white};
  height: 600px;
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
