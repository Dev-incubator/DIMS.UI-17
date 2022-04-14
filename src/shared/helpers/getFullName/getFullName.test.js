import { getFullName } from './getFullName';

describe('check create full name', () => {
  it('should returns string full name', () => {
    const name = 'Ivan';
    const lstName = 'Ivanov';
    expect(getFullName(name, lstName)).toBe('Ivan Ivanov');
  });
  it('should returns undefined', () => {
    expect(getFullName()).toBeUndefined();
  });
  it('should not returns undefined', () => {
    const name = 'Ivan';
    expect(getFullName(name)).not.toBeUndefined();
  });
});
