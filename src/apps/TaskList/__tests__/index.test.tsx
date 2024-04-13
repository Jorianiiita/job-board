import { render, waitFor, act, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import TaskList from '..';

// FIXME: Fix the testcases
describe('Task List', () => {
  const tasks = [
    { name: 'Make food', description: 'Cook something indian', id: 1 },
    { name: 'Learn React', description: 'Learn about hooks\\n', id: 2 },
    {
      name: 'Send email to Abetare',
      description: 'Ask for update on H1b ammendment filing\\n',
      id: 3,
    },
  ];

  jest.mock('../db.ts', () => ({
    addTask: jest.fn(() => Promise.resolve()),
    deleteTask: jest.fn(() => Promise.resolve()),
    getTasks: jest.fn(() => Promise.resolve(tasks)),
    setupDB: jest.fn(() => Promise.resolve()),
  }));

  it('renders the task list app', () => {
    const { getByText } = render(<TaskList />);
    screen.debug();
    expect(getByText('Task Listing')).toBeInTheDocument();
  });
});
