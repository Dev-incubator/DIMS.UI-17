import { userTypesValidation } from './typesValidation';

describe('check types fields object', () => {
  const user1 = {
    firstName: 'Evgeniy',
    roles: 'admin',
    universityAverageScore: '8',
    mathScore: '8',
  };
  it('field roles should return array', () => {
    expect(userTypesValidation(user1).roles).toEqual(['admin']);
  });
  it('field mathScore and  universityAverageScore should return numbers', () => {
    expect(userTypesValidation(user1)).toEqual(expect.objectContaining({ mathScore: 8, universityAverageScore: 8 }));
  });
  it('should resurns the same object', () => {
    const user2 = {
      firstName: 'Tolya',
      roles: ['admin'],
      universityAverageScore: 9,
      mathScore: 8,
    };
    expect(userTypesValidation(user2)).toEqual(user2);
  });
});
