import styled from 'styled-components';

import Typography from '../typography';

export const Text = styled(Typography)`
  color: ${({ theme }) => theme.colors.spunPearl};
  display: flex;
  gap: 4px;
  margin-top: 12px;
`;
