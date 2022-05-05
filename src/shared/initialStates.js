export const initialStateTasks = {
  name: '',
  description: '',
  startDate: '',
  deadlineDate: '',
  statuses: [],
  tracks: [],
  assignedUsers: [],
};

export const initialStateCreatMember = {
  firstName: '',
  lastName: '',
  email: '',
  sex: '',
  roles: '',
  password: '',
  repeatPassword: '',
  directionName: '',
  birthDate: '',
  address: '',
  mobilePhone: '',
  skype: '',
  startDate: '',
  education: '',
  universityAverageScore: '',
  mathScore: '',
};

export const initialStateTrack = {
  id: '',
  name: '',
  date: '',
  node: '',
  userId: '',
};

export const initialStateAuth = {
  firstName: '',
  role: '',
  userId: '',
  isAuth: false,
  apiMode: 'restAPI',
  error: '',
};
