import { getAge } from './getAge';

describe('returns age from date string', () => {
  it('returns age', () => {
    const birthDate = '1992-07-08';
    expect(getAge(birthDate)).toBe(29);
  });
  it('should return some value', () => {
    const birthDate = '1992-07-08';
    expect(getAge(birthDate)).not.toBeUndefined();
  });
});
