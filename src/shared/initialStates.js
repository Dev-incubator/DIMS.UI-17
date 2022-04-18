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
  apiMode: 'restAPI',
  error: '',
};
