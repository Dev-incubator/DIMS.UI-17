import { generateId } from './generateId';

describe('Generetion random ID', () => {
  it('ID = 12 symbols, numbers and letters', () => {
    expect(generateId()).toMatch(/[0-9 A-Z]{12}/);
  });
  it('ID is not only numbers', () => {
    expect(generateId()).not.toMatch(/[0-9]{12}/);
  });
  it('ID is not only letters', () => {
    expect(generateId()).not.toMatch(/[A-Z]{12}/);
  });
});
