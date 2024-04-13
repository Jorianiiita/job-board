import setCancellableInterval from '.';

jest.useFakeTimers();

describe('setCancellableInterval', () => {
  let callback: jest.Mock<void, unknown[]>;
  let cancel: () => void;
  beforeEach(() => {
    callback = jest.fn();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('returns a function', () => {
    cancel = setCancellableInterval(callback, 0);
    expect(typeof cancel).toEqual('function');
  });

  it('calls the callback specific number of times', () => {
    cancel = setCancellableInterval(callback, 100);
    jest.advanceTimersByTime(300);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it(`cancelling the interval shouldn't call the callback anymore`, () => {
    jest.advanceTimersByTime(400);
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
