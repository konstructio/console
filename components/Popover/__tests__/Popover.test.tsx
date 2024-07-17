import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Popover, { IPopoverProps } from '../Popover';

describe('Popover', () => {
  const renderCompoenent = (props: IPopoverProps) => {
    render(<Popover {...props} />);

    return {
      user: userEvent.setup(),
    };
  };

  test('should render componente into the dom', () => {
    renderCompoenent({
      content: <span>Hello from the test</span>,
      popover: 'Content of the test',
    });

    const content = screen.getByText(/hello from the test/i);

    expect(content).toBeInTheDocument();
  });

  test('should show the content of the popover when the user doing hover over the element', async () => {
    const { user } = renderCompoenent({
      content: <span>Hello from the test</span>,
      popover: 'Content of the test',
    });

    const content = screen.getByText(/hello from the test/i);
    await act(() => user.hover(content));

    expect(await screen.findByText(/content of the test/i)).toBeInTheDocument();
  });
});
