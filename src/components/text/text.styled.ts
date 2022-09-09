import styled from 'styled-components';

export const TextStyled = styled.span<{
  color: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
}>`
  ${({ color, fontSize, fontWeight, lineHeight }) => `
    color: ${color};
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    line-height: ${lineHeight}px;
  `}
`;
