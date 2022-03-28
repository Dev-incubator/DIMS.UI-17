export const regExpEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
export const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;
const regExpPhone = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
const regExpNumbers = /^[0-9,.]+$/i;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function createFullName(items) {
  return items.map((item) => ({
    ...item,
    name: `${item.name} ${item.lastName}`,
  }));
}

export function generateId() {
  let ID = '';
  for (let i = 0; i < 12; i += 1) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }

  return ID;
}

export function stopPropagationHandler(e) {
  e.stopPropagation();
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
  return Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);
}

export function getCurrentYear() {
  return new Date().getFullYear();
}
