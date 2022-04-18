import { regExpEmail, regExpNumbers, regExpPassword, regExpPhone } from '../../regulars';
import { getAge } from '../getAge/getAge';

export function validateFormField(name, value, password) {
  let error = '';
  switch (name) {
    case 'name':
    case 'firstName':
    case 'lastName':
      error = value.length < 3 ? 'short' : '';
      break;
    case 'email':
      error = value.match(regExpEmail) ? '' : 'is invalid';
      break;
    case 'password':
      error = value.match(regExpPassword) ? '' : 'min 8 characters 1 letter and 1 number';
      break;
    case 'repeatPassword':
      error = value === password ? '' : 'is invalid';
      break;
    case 'birthDate':
      error = getAge(value) >= 18 ? '' : 'is invalid';
      break;
    case 'mobilePhone':
      error = value.match(regExpPhone) ? '' : 'is invalid';
      break;
    case 'startDate':
    case 'node':
    case 'date':
    case 'deadlineDate':
    case 'education':
    case 'address':
      error = value === '' ? 'required' : '';
      break;
    case 'universityAverageScore':
    case 'mathScore':
      error = value.match(regExpNumbers) ? '' : 'is invalid';
      break;

    default:
      break;
  }

  return { name, error };
}
