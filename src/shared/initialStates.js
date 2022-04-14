import { FORM_MEMBER_ERRORS, FORM_TASK_ERRORS, FORM_TRACKS_ERRORS } from './constants';

export const initialStateTasks = {
  name: '',
  description: '',
  startDate: '',
  deadlineDate: '',
  statuses: [],
  subscribers: [],
  formErrors: FORM_TASK_ERRORS,
};

export const initialStateCreatMember = {
  name: '',
  lastName: '',
  email: '',
  sex: 'male',
  role: 'member',
  password: '',
  confirmPassword: '',
  direction: 'JAVA',
  birthDate: '',
  address: '',
  phone: '',
  skype: '',
  startDate: '',
  education: '',
  universityAverageAcore: '',
  mathScore: '',
  formErrors: FORM_MEMBER_ERRORS,
};

export const initialStateTrack = {
  id: '',
  name: '',
  date: '',
  node: '',
  userId: '',
  formErrors: FORM_TRACKS_ERRORS,
};

export const initialStateAuth = {
  name: '',
  role: '',
  uid: '',
  isAuth: false,
  error: '',
};
