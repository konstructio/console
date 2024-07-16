import React from 'react';
import { screen, render, act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';

import Button, { IButtonProps } from '../Button';
import { theme } from '../../../theme';

describe('Button', () => {
  const renderComponent = (props: IButtonProps) => {
    render(
      <ThemeProvider theme={theme}>
        <Button {...props} />
      </ThemeProvider>,
    );

    return {
      button: screen.getByRole('button'),
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render the button', async () => {
    const { button } = renderComponent({ color: 'primary' });

    expect(button).toBeInTheDocument();
  });

  test('should render disabled the button', async () => {
    const { button } = renderComponent({ color: 'primary', disabled: true });

    expect(button).toBeInTheDocument();
    expect(button).toHaveProperty('disabled', true);
  });

  test('should call the onClick callback after the user clicked', async () => {
    const handleClick = jest.fn();

    const { button } = renderComponent({ color: 'primary', onClick: handleClick });
    const user = userEvent.setup();
    await act(() => user.click(button));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
