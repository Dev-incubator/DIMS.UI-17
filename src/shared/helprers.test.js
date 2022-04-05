import { generateId, getAge, validateFormCreateUser } from './helpers';

it('ID generation check', () => {
  expect(generateId()).toMatch(/[0-9 A-Z]{12}/);
});

it('get age works', () => {
  const birthDate = '1992-07-08';
  expect(getAge(birthDate)).toBe(29);
});

it('check validate form create user for name, password, email, age', () => {
  expect(validateFormCreateUser('name', 'Ivan')).toEqual({ name: 'name', error: '' });
  expect(validateFormCreateUser('name', 'Iv')).toEqual({ name: 'name', error: 'short' });

  expect(validateFormCreateUser('password', 'qwer1234')).toEqual({ name: 'password', error: '' });
  expect(validateFormCreateUser('password', '12348')).toEqual({
    name: 'password',
    error: 'min 8 characters 1 letter and 1 number',
  });

  expect(validateFormCreateUser('email', 'yandex@yandex.ru')).toEqual({ name: 'email', error: '' });
  expect(validateFormCreateUser('email', 'yandex.ru')).toEqual({
    name: 'email',
    error: 'is invalid',
  });

  expect(validateFormCreateUser('birthDate', '1992-07-08')).toEqual({ name: 'birthDate', error: '' });
  expect(validateFormCreateUser('birthDate', '2010-07-08')).toEqual({
    name: 'birthDate',
    error: 'is invalid',
  });
});
