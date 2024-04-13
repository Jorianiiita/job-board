import { callCallback, flattern } from '.';

describe('Test flattern', () => {
  it('should return correct result', () => {
    const result = flattern([1, 2, [3], [[4], 5]]);
    expect(result[2]).toBe(3);
    expect(result[3]).toBe(4);
    expect(result[4]).toBe(5);
  });
});

describe('Test callCallback', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`should return number as it's if number < 10`, () => {
    expect(callCallback(5)).toEqual(5);
  });

  it('should call callback if number >= 10', () => {
    const callbackSpy = jest.fn();
    expect(callCallback(11, callbackSpy)).toEqual(undefined);
    expect(callbackSpy).toBeCalledTimes(1);
    expect(callbackSpy.mock.calls[0][0]).toEqual(16);
  });
});
