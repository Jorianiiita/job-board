import {
  screen,
  render,
  getRoles,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';

import TransferList, { ItemsColumn } from '..';
import userEvent from '@testing-library/user-event';

describe('Transfer List', () => {
  describe('ItemsColumn component', () => {
    const setList = jest.fn();

    it('renders the column name and items list', () => {
      const list = new Map([
        ['item1', false],
        ['item2', true],
      ]);

      render(<ItemsColumn list={list} name="Test Column" setList={setList} />);

      expect(screen.getByText('item1')).toBeInTheDocument();
      expect(screen.getByText('item2')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Add new Item')).toBeInTheDocument();
      expect(
        screen.getByLabelText('add new Item in the list'),
      ).toBeInTheDocument();
      expect(screen.getByText('1 / 2 Selected')).toBeInTheDocument();
    });

    it('adds new item to the list', async () => {
      render(
        <ItemsColumn name="Test Column" list={new Map()} setList={setList} />,
      );
      const input = screen.getByLabelText('add new Item in the list');
      const form = screen.getByRole('form');

      // Simulate typing a new item in the input field
      // await userEvent.change(input, { target: { value: 'New Item' } });

      await userEvent.type(input, 'New Item');

      // Simulate submitting the form
      await fireEvent.submit(form);
      expect(setList).toHaveBeenCalledWith(expect.any(Map)); // Asserting that setList was called with a Map
      expect(setList).toHaveBeenCalledWith(
        expect.objectContaining({ size: 1 }),
      ); // Asserting that setList was called with a Map containing one item

      waitFor(() => {
        expect(screen.getByText('New Item')).toBeInTheDocument();
      });
    });
  });

  describe('Transfer actions works correctly', () => {
    it('clicking at >> should transfer all the item from left to right list', async () => {
      render(<TransferList />);
      const leftColumn = screen.getByTestId('left-items');
      const rightColumn = screen.getByTestId('right-items');
      expect(within(leftColumn).getByText(/html/i)).toBeInTheDocument();
      expect(within(rightColumn).queryByText(/html/i)).not.toBeInTheDocument();

      const button = screen.getByText(/>>/i);
      await userEvent.click(button);

      expect(within(rightColumn).getByText(/html/i)).toBeInTheDocument();
      expect(within(leftColumn).queryByText(/html/i)).not.toBeInTheDocument();
    });

    it('clicking at << should transfer all the item from right to left list', async () => {
      render(<TransferList />);
      const leftColumn = screen.getByTestId('left-items');
      const rightColumn = screen.getByTestId('right-items');
      expect(within(rightColumn).getByText(/react/i)).toBeInTheDocument();
      expect(within(leftColumn).queryByText(/react/i)).not.toBeInTheDocument();

      const button = screen.getByText(/<</i);
      await userEvent.click(button);

      expect(within(leftColumn).getByText(/react/i)).toBeInTheDocument();
      expect(within(rightColumn).queryByText(/react/i)).not.toBeInTheDocument();
    });

    it('clicking at > should transfer all the selected items from left to right list', async () => {});
  });
});
