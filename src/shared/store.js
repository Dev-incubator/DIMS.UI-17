import { createTask } from './helpers';

export const initialStateTasks = {
  tasks: [],
  pageTitle: '',
  buttonTitle: '',
  buttonClick: createTask,
  tableTitles: {},
};

export const initialStateCreatMember = {
  name: '',
  lastName: '',
  email: '',
  sex: '',
  role: '',
  password: '',
  confirmPassword: '',
  birthDate: '',
  address: '',
  phone: '',
  skype: '',
  startDate: '',
  education: '',
  universityAverageAcore: '',
  mathScore: '',
};
