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
};
