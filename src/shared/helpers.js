import { regExpEmail, regExpNumbers, regExpPassword, regExpPhone } from './regulars';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const iDLength = 12;
const characterLength = 36;

export function generateId() {
  let id = '';
  for (let i = 0; i < iDLength; i += 1) {
    id += characters.charAt(Math.floor(Math.random() * characterLength));
  }

  return id;
}

export function validateFormField(name, value, password) {
  let error = '';
  switch (name) {
    case 'name':
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
    case 'phone':
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
    case 'universityAverageAcore':
    case 'mathScore':
      error = value.match(regExpNumbers) ? '' : 'is invalid';
      break;

    default:
      break;
  }

  return { name, error };
}

export function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString.split('-').join(','));
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
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

    if (isFunction(obj1[key]) || isFunction(obj2[key])) {
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

function isFunction(value) {
  return value === 'function';
}
