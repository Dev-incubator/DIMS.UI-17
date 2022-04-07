import { getCurrentYear } from './getCurrentYear';

describe('get current year', () => {
  it('return year', () => {
    expect(getCurrentYear()).toBe(2022);
  });
  it('return somethings', () => {
    expect(getCurrentYear()).not.toBeUndefined();
  });
});
