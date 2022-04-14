import { validateFormField } from './validateFormField';

describe('validation fields', () => {
  it('error message empty', () => {
    expect(validateFormField('name', 'Ivan')).toEqual({ name: 'name', error: '' });
    expect(validateFormField('password', 'qwer1234')).toEqual({ name: 'password', error: '' });
    expect(validateFormField('email', 'yandex@yandex.ru')).toEqual({ name: 'email', error: '' });
    expect(validateFormField('birthDate', '1992-07-08')).toEqual({ name: 'birthDate', error: '' });
  });
  it('there is error messege', () => {
    expect(validateFormField('name', 'Iv')).toEqual({ name: 'name', error: 'short' });
    expect(validateFormField('password', '12348')).toEqual({
      name: 'password',
      error: 'min 8 characters 1 letter and 1 number',
    });
    expect(validateFormField('email', 'yandex.ru')).toEqual({
      name: 'email',
      error: 'is invalid',
    });
    expect(validateFormField('birthDate', '2010-07-08')).toEqual({
      name: 'birthDate',
      error: 'is invalid',
    });
  });
  it('error message not empty', () => {
    expect(validateFormField('name', 'I')).not.toEqual({ name: 'name', error: '' });
    expect(validateFormField('password', '1234')).not.toEqual({ name: 'password', error: '' });
    expect(validateFormField('email', 'yandex.ru')).not.toEqual({ name: 'email', error: '' });
    expect(validateFormField('birthDate', '2010-07-08')).not.toEqual({ name: 'birthDate', error: '' });
  });
});
