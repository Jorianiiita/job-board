import { fireEvent, render, waitFor, act } from '@testing-library/react';
import JobBoard from './../index';

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

  // jest.mock('../apiUtil', () => ({
  //   getjobs: jest.fn(() => mockJobIds), // Provide a mock implementation for the function
  //   getjobdetails: jest.fn(() => mockJobDetails),
  // }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetch data and lists 6 job posting', async () => {
    let { getByText, queryAllByText } = render(<JobBoard />);
    expect(getByText(/Hacker News/i)).toBeInTheDocument();

    // shows loading message
    expect(getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(queryAllByText(/Tesorio/i)).toBeTruthy();
      expect(getByText('Load more jobs')).toBeInTheDocument();
    });
    let button = getByText('Load more jobs');
    expect(button).not.toHaveAttribute('disabled');
    expect(button).toHaveTextContent('Load more jobs');
    await act(() => {
      fireEvent.click(button);
    });
    expect(button).toHaveAttribute('disabled');
    expect(button).toHaveTextContent('Loading...');
    await waitFor(() => {
      // Need to use 1 of of below 2 code lines to wait which intend
      // to wait for button coming back to non loading state
      expect(button).not.toHaveAttribute('disabled');
      expect(getByText('Load more jobs')).toBeInTheDocument();
    });
    expect(button).toHaveTextContent('Load more jobs');
  });
});
