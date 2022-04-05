import { regExpEmail, regExpNumbers, regExpPassword, regExpPhone } from './regulars';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const iDLength = 12;
const characterLength = 36;
const secondsInYear = 3.15576e10;

export function generateId() {
  let id = '';
  for (let i = 0; i < iDLength; i += 1) {
    id += characters.charAt(Math.floor(Math.random() * characterLength));
  }

  return id;
}

export function validateFormCreateUser(name, value, password) {
  let error = '';
  switch (name) {
    case 'name':
      error = value.length < 3 ? 'short' : '';
      break;
    case 'lastName':
      error = value.length < 3 ? 'short' : '';
      break;
    case 'email':
      error = value.match(regExpEmail) ? '' : 'is invalid';
      break;
    case 'password':
      error = value.match(regExpPassword) ? '' : 'min 8 characters 1 letter and 1 number';
      break;
    case 'confirmPassword':
      error = value === password ? '' : 'is invalid';
      break;
    case 'birthDate':
      error = getAge(value) >= 18 ? '' : 'is invalid';
      break;
    case 'address':
      error = value === '' ? 'required' : '';
      break;
    case 'phone':
      error = value.match(regExpPhone) ? '' : 'is invalid';
      break;
    case 'startDate':
      error = value === '' ? 'required' : '';
      break;
    case 'node':
      error = value === '' ? 'required' : '';
      break;
    case 'date':
      error = value === '' ? 'required' : '';
      break;
    case 'deadlineDate':
      error = value === '' ? 'required' : '';
      break;
    case 'education':
      error = value === '' ? 'required' : '';
      break;
    case 'universityAverageAcore':
      error = value.match(regExpNumbers) ? '' : 'is invalid';
      break;
    case 'mathScore':
      error = value.match(regExpNumbers) ? '' : 'is invalid';
      break;

    default:
      break;
  }

  return { name, error };
}

export function getAge(birthDate) {
  return Math.floor((new Date() - new Date(birthDate).getTime()) / secondsInYear);
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function compareObjects(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    typeof obj1 === 'undefined' ||
    typeof obj2 === 'undefined'
  ) {
    return false;
  }

  const keysA = Object.keys(obj1);
  const keysB = Object.keys(obj2);

  if (keysA.length !== keysB.length) {
    return false;
  }

  let result = true;

  keysA.forEach((key) => {
    if (!keysB.includes(key)) {
      result = false;
    }

    if (isFunction(obj1[key], obj2[key])) {
      if (obj1[key].tostring() !== obj2[key].tostring()) {
        result = false;
      }
    }

    if (!compareObjects(obj1[key], obj2[key])) {
      result = false;
    }
  });

  return result;
}

function isFunction(field1, field2) {
  return field1 === 'function' || field2 === 'function' || false;
}
