import {
  DIRECTIONS_OPTIONS_KEYS,
  FORM_MEMBER_ERRORS,
  FORM_TASK_ERRORS,
  FORM_TRACKS_ERRORS,
  ROLE_OPTIONS_KEYS,
  SEX_OPTIONS_KEYS,
} from './constants';

export const initialStateTasks = {
  name: '',
  description: '',
  startDate: '',
  deadlineDate: '',
  statuses: [],
  tracks: [],
  assignedUsers: [],
  formErrors: FORM_TASK_ERRORS,
};

export const initialStateCreatMember = {
  firstName: '',
  lastName: '',
  email: '',
  sex: SEX_OPTIONS_KEYS[0],
  roles: ROLE_OPTIONS_KEYS[0],
  password: '',
  directionName: DIRECTIONS_OPTIONS_KEYS[0],
  repeatPassword: '',
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
  firstName: '',
  role: '',
  userId: '',
  isAuth: false,
  apiMode: 'restAPI',
  error: '',
};
