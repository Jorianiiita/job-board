import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GridLights from '../index';

// Test the GridLights component using react-testing-library and click events using user-event.
// We will test the following:
// - The GridLights component renders correctly.
// - The GridLights component has the correct number of cells.
// - The GridLights component activates cells when clicked.
// - The GridLights component deactivates cells after all cells are activated.
// - The GridLights component disables clicking during deactivation.
// - The GridLights component does not allow clicking on already activated cells.
// - The GridLights component does not allow clicking on cells during deactivation.
// - The GridLights component does not allow clicking on cells after all cells are activated.
describe('GridLights app', () => {
  test('GridLights component', async () => {
    render(<GridLights />);

    // Check if the GridLights component renders correctly.
    const grid = screen.getByRole('grid');
    expect(grid).toBeInTheDocument();

    // Check if the GridLights component has the correct number of cells.
    const cells = screen.getAllByRole('button');
    expect(cells).toHaveLength(8);

    // Check if the GridLights component activates cells when clicked.
    act(() => {
      userEvent.click(cells[0]);
      userEvent.click(cells[1]);
      userEvent.click(cells[2]);
      userEvent.click(cells[3]);
      userEvent.click(cells[4]);
      userEvent.click(cells[5]);
      userEvent.click(cells[6]);
    });
    await waitFor(() => {
      expect(cells[0]).toHaveClass('cell--activated');
    });

    // Check if the GridLights component deactivates cells after all cells are activated.

    await waitFor(() => expect(cells[0]).not.toBeDisabled());

    // Check if the GridLights component disables clicking during deactivation.
    userEvent.click(cells[0]);
    userEvent.click(cells[1]);
    userEvent.click(cells[2]);
    userEvent.click(cells[3]);
    userEvent.click(cells[4]);
    userEvent.click(cells[5]);
    userEvent.click(cells[6]);
    userEvent.click(cells[7]);
    expect(cells[0]).not.toHaveClass('cell--activated');

    // Check if the GridLights component does not allow clicking on already activated cells.
    userEvent.click(cells[0]);
    expect(cells[0]).not.toHaveClass('cell--activated');

    // Check if the GridLights component does not allow clicking on cells during deactivation.
    userEvent.click(cells[1]);
    expect(cells[1]).not.toHaveClass('cell--activated');

    // Check if the GridLights component does not allow clicking on cells after all cells are activated.
    userEvent.click(cells[2]);
    expect(cells[2]).not.toHaveClass('cell--activated');
  });

  // Write a test to test the order of activation and deactivation of cells.
  // We will test the following:
  // - The GridLights component activates cells in the correct order.
  // - The GridLights component deactivates cells in the correct order.
  test('GridLights component order of activation and deactivation', async () => {
    // jest.useFakeTimers();
    render(<GridLights />);

    const cells = screen.getAllByRole('button');

    // Check if the GridLights component activates cells in the correct order.
    act(() => {
      userEvent.click(cells[0]);
      userEvent.click(cells[1]);
      // userEvent.click(cells[2]);
      // userEvent.click(cells[3]);
      // userEvent.click(cells[4]);
      // userEvent.click(cells[5]);
      // userEvent.click(cells[6]);
      // userEvent.click(cells[7]);
    });

    await waitFor(() => {
      screen.debug(cells[0]);
      expect(cells[0]).toHaveClass('cell--activated');
    });

    expect(cells[1]).toHaveClass('cell--activated');
    expect(cells[2]).toHaveClass('cell--activated');
    expect(cells[3]).toHaveClass('cell--activated');
    expect(cells[4]).toHaveClass('cell--activated');
    expect(cells[5]).toHaveClass('cell--activated');
    expect(cells[6]).toHaveClass('cell--activated');
    expect(cells[7]).toHaveClass('cell--activated');

    // screen.debug();

    // Check if the GridLights component deactivates cells in the correct order.
    // act(() => {
    //   jest.advanceTimersByTime(600);
    // });
    // waitFor(() => {
    //   expect(cells[0]).not.toHaveClass('active');
    // });

    // expect(cells[1]).toHaveClass('active');
    // expect(cells[2]).toHaveClass('active');
    // expect(cells[3]).toHaveClass('active');
    // expect(cells[4]).toHaveClass('active');
    // expect(cells[5]).toHaveClass('active');
    // expect(cells[6]).toHaveClass('active');
    // expect(cells[7]).toHaveClass('active');
  });
});
