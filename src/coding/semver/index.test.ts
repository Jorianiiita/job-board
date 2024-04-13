import compare from '.';

describe('Semver', () => {
  it('returns 1 when v1 is greater than v2', () => {
    expect(compare('12.1.0', '12.0.9')).toEqual(1);
  });
  it('returns 1 when v1 is greater than v2', () => {
    expect(compare('15.11.3', '5.4.411')).toEqual(1);
  });
  it('returns -1 when v1 is greater than v2', () => {
    expect(compare('12.1.0', '12.1.2')).toEqual(-1);
  });
  it('returns 0 when v1 is greater than v2', () => {
    expect(compare('5.0.1', '5.0.1')).toEqual(0);
  });
});
