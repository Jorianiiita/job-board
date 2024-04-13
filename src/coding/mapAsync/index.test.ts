import mapAsync from '.';

const asyncDouble = (x: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 2);
    }, 10);
  });

const asyncRejectOdd = (x: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (x % 2 === 1) {
        reject(x * 3);
      }

      resolve(x * 2);
    }, 10);
  });

describe('Map Async', () => {
  it('returns promise', async () => {
    const promise = mapAsync([], asyncDouble);
    expect(promise).toBeInstanceOf(Promise);
  });

  it('empty array input should return empty array', async () => {
    const result = await mapAsync([], asyncDouble);
    expect(result).toEqual([]);
  });

  it('return accurate value', async () => {
    const result = await mapAsync([1, 2], asyncDouble);
    await expect(result).toEqual([2, 4]);
  });

  it('some rejected', async () => {
    await expect(mapAsync([2, 3], asyncRejectOdd)).rejects.toBe(9);
  });
});
