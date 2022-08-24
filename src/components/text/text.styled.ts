import styled from 'styled-components';

export const TextStyled = styled.span`
  ${({ color, fontSize, fontWeight, lineHeight }: { [key: string]: string | number }) => `
    color: ${color};
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    line-height: ${lineHeight}px;
  `}
`;
