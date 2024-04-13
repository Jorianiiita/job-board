import { render, screen, waitFor, act } from '@testing-library/react';
import TreeView from '../index';
import { fetchData } from '../api';
import userEvent from '@testing-library/user-event';

jest.mock('./../api', () => ({
  fetchData: jest.fn(),
}));

const mockData = [
  {
    id: '1',
    name: 'Office Map',
  },
  {
    id: '2',
    name: 'New Employee Onboarding',
    children: [
      {
        id: '8',
        name: 'Onboarding Materials',
      },
      {
        id: '9',
        name: 'Training',
      },
    ],
  },
];

describe('Tree View', () => {
  beforeEach(() => {
    fetchData.mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('render the Tree View given data', async () => {
    act(() => {
      render(<TreeView />);
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(fetchData).toHaveBeenCalledTimes(1);
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByText('Office Map')).toBeInTheDocument();
    });

    const eleWithChild = screen.getByText('New Employee Onboarding');
    act(() => {
      userEvent.click(eleWithChild);
    });

    await waitFor(() => {
      expect(screen.getByText('Onboarding Materials')).toBeInTheDocument();
      expect(screen.getByText('Training')).toBeInTheDocument();
    });

    act(() => userEvent.click(eleWithChild));

    await waitFor(() => {
      expect(
        screen.queryByText('Onboarding Materials'),
      ).not.toBeInTheDocument();
      expect(screen.queryByText('Training')).not.toBeInTheDocument();
    });
  });
});
