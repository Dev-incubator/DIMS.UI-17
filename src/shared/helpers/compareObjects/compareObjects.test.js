import { compareObjects } from './compareObjects';

const obj1 = {
  id: 'GwMrm3jnkHaksXqCXTGP51n2JK03',
  address: 'Minlk',
  password: 'qwer1234',
  direction: 'Java',
  email: 'yana@qwer.com',
  birthDate: '1995-04-10',
  confirmPassword: 'qwer1234',
  name: 'Yana',
  mathScore: '10',
  phone: '+375291115551',
  lastName: 'Ivanova',
  skype: 'Uas',
  role: 'member',
  startDate: '2022-04-11',
  education: 'BSU',
  sex: 'Women',
  universityAverageAcore: '10',
};

const obj2 = {
  id: 'HvGlD9fB3Tf9DiC7SLImDLCcmj02',
  universityAverageAcore: '12',
  lastName: 'Ivanov',
  direction: 'JAVA',
  address: 'Волгоградская 1/3, кв. 35',
  confirmPassword: 'qwer1234',
  name: 'Tolyaa',
  birthDate: '2002-02-05',
  phone: '+375297084945',
  password: 'qwer1234',
  role: 'mentor',
  skype: 'qw',
  mathScore: '12',
  startDate: '2022-03-21',
  education: 'ww',
  sex: 'male',
  email: 'tolya@gmail.com',
};
describe('comparison of object fields', () => {
  it('should return true', () => {
    expect(compareObjects(obj1, obj1)).toBe(true);
  });
  it('should return false', () => {
    expect(compareObjects(obj1, obj2)).toBe(false);
  });
  it('should return something', () => {
    expect(compareObjects(obj1, obj2)).not.toBeUndefined();
  });
});
