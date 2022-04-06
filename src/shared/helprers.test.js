import { generateId, getAge, validateFormField } from './helpers';

it('ID generation check', () => {
  expect(generateId()).toMatch(/[0-9 A-Z]{12}/);
});

it('get age works', () => {
  const birthDate = '1992-07-08';
  expect(getAge(birthDate)).toBe(29);
});

it('check validate form create user for name, password, email, age', () => {
  expect(validateFormField('name', 'Ivan')).toEqual({ name: 'name', error: '' });
  expect(validateFormField('name', 'Iv')).toEqual({ name: 'name', error: 'short' });

  expect(validateFormField('password', 'qwer1234')).toEqual({ name: 'password', error: '' });
  expect(validateFormField('password', '12348')).toEqual({
    name: 'password',
    error: 'min 8 characters 1 letter and 1 number',
  });

  expect(validateFormField('email', 'yandex@yandex.ru')).toEqual({ name: 'email', error: '' });
  expect(validateFormField('email', 'yandex.ru')).toEqual({
    name: 'email',
    error: 'is invalid',
  });

  expect(validateFormField('birthDate', '1992-07-08')).toEqual({ name: 'birthDate', error: '' });
  expect(validateFormField('birthDate', '2010-07-08')).toEqual({
    name: 'birthDate',
    error: 'is invalid',
  });
});
