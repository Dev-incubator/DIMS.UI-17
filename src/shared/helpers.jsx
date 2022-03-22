const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function filterMembers(items) {
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
      error = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? '' : ' is invalid';
      break;
    case 'password':
      error = value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i) ? '' : ' min 8 characters 1 letter and 1 number ';
      break;
    case 'confirmPassword':
      error = value === password ? '' : ' is invalid';
      break;
    case 'birthDate':
      error = getAge(value) >= 18 ? '' : ' is invalid';
      break;
    case 'address':
      error = value === '' ? 'required' : '';
      break;
    case 'phone':
      error = value.match(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i) ? '' : 'is invalid';
      break;
    case 'startDate':
      error = value === '' ? 'required' : '';
      break;
    case 'education':
      error = value === '' ? 'required' : '';
      break;
    case 'universityAverageAcore':
      error = value.match(/^[0-9,.]+$/i) ? '' : 'is invalid';
      break;
    case 'mathScore':
      error = value.match(/^[0-9,.]+$/i) ? '' : 'is invalid';
      break;

    default:
      break;
  }

  return { name, error };
}

function getAge(birthDate) {
  return Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);
}

export function getCurrentYear() {
  return new Date().getFullYear();
}
