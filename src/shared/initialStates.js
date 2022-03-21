export const initialStateTasks = {
  name: '',
  description: '',
  startDate: '',
  deadlineDate: '',
  statuses: [],
  subscribers: [],
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
  formErrors: {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    address: '',
    phone: '',
    startDate: '',
    education: '',
    universityAverageAcore: '',
    mathScore: '',
  },
};

export const initialStateTrack = {
  id: '',
  name: '',
  date: '',
  node: '',
  userId: '',
};

export const initialStateAuth = {
  name: '',
  role: '',
  uid: '',
  isAuth: false,
  error: '',
};