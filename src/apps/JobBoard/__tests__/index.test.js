import {
  fireEvent,
  render,
  waitFor,
  act,
  screen,
  logRoles,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import JobBoard from '../index';
import userEvent from '@testing-library/user-event';
import exp from 'constants';

describe('Job Board App', () => {
  const mockJobIds = [
    39541631, 39529895, 39526423, 39523023, 39520960, 39502433, 39495125,
    39493068, 39486517, 39483125, 39479522, 39475552, 39473170, 39469864,
    39465878, 39459507, 39456338,
  ];

  const mockJobDetails = {
    by: 'FabioFleitas',
    id: 39529895,
    score: 1,
    time: 1709067742,
    title: 'Tesorio (YC S15) Is Hiring a Head of Infrastructure (100% Remote)',
    type: 'job',
    url: 'https://www.tesorio.com/careers#job-openings',
  };

  // jest.mock('./../apiUtil', () => ({
  //   getjobs: jest.fn(() => mockJobIds), // Provide a mock implementation for the function
  //   getjobdetails: jest.fn(() => mockJobDetails),
  // }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetch data and lists 6 job posting', async () => {
    render(<JobBoard />);
    expect(screen.getByText(/Hacker News/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading Job board/i)).toBeInTheDocument();

    let button = await screen.findByRole('button'); // findBy included waitFor internally
    expect(screen.queryByText(/Loading Job board/i)).not.toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(screen.queryAllByText(/Tesorio/i)).toBeTruthy();
    expect(button).toHaveTextContent('Load more jobs');
    await act(() => userEvent.click(button));
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading Jobs...');

    await waitFor(() => {
      // Need to use 1 of of below 2 code lines to wait which intend
      // to wait for button coming back to non loading state
      expect(button).not.toBeDisabled();
    });
    expect(button).toHaveTextContent('Load more jobs');
  });
});
