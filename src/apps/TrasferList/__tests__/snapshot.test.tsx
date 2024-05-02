import React from 'react';
import { render } from '@testing-library/react';
import { ItemsColumn } from '..';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useId: () => 'r:id',
}));

describe('ItemsColumn Component', () => {
  const setList = jest.fn();

  it('should match the snapshot', () => {
    const list = new Map([
      ['item1', false],
      ['item2', true],
    ]);
    const { container } = render(
      <ItemsColumn list={list} name="Test Column" setList={setList} />,
    );
    expect(container).toMatchSnapshot();
  });
});
