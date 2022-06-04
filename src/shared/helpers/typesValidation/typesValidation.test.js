import { userTypesValidation } from './typesValidation';

describe('user', () => {
  const user1 = {
    firstName: 'Evgeniy',
    roles: 'admin',
    universityAverageScore: '8',
    mathScore: '8',
  };
  it('field roles validation should return array of roles', () => {
    expect(userTypesValidation(user1).roles).toEqual(['admin']);
  });
  it('fields mathScore and universityAverageScore should return value of type number', () => {
    expect(userTypesValidation(user1)).toEqual(expect.objectContaining({ mathScore: 8, universityAverageScore: 8 }));
  });
  it('should return the same object', () => {
    const user2 = {
      firstName: 'Tolya',
      roles: ['admin'],
      universityAverageScore: 9,
      mathScore: 8,
    };
    expect(userTypesValidation(user2)).toEqual(user2);
  });
});
