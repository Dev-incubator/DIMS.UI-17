export const baseURL = 'https://json-server-for-dims.herokuapp.com';
export const baseLocalURL = 'http://localhost:3001';

export const sex = {
  man: 'Male',
  woman: 'Women',
};

export const TITLES_PAGES = {
  members: 'Members',
  currentTasks: 'Current Tasks',
  progress: 'Progress',
};
export const BUTTONS_NAMES = {
  create: 'Create',
  tasks: 'Tasks',
  progress: 'Progress',
  edit: 'Edit',
  delete: 'Delete',
  backToList: 'Back To List',
  fail: 'Fail',
  success: 'Success',
};

export const BUTTONS_TYPES = {
  typePrimary: 'typePrimary',
  typeSecondary: 'typeSecondary',
  typeEdit: 'typeEdit',
  typeDelete: 'typeDelete',
  typeSave: 'typeSave',
};

export const TABLE_TITLES = {
  members: {
    id: '#',
    name: 'Full name',
    direction: 'Direction',
    education: 'Education',
    startDate: 'Start',
    birthDate: 'Age',
    actions: 'Actions',
  },
  currentTasks: {
    id: '#',
    name: 'Task name',
    startDate: 'Start date',
    deadlineDate: 'Deadline',
    status: 'Status',
    actions: 'Actions',
  },
  progress: {
    id: '#',
    name: 'Task name',
    node: 'Task note',
    date: 'Date',
  },
};

export const USER_ROLES = {
  admin: 'admin',
  mentor: 'mentor',
  member: 'member',
};

export const PAGES_KEYS = {
  tasks: 'tasks',
  progress: 'progress',
};

export const STATUS_KEYS = {
  active: 'Active',
  success: 'Success',
  fail: 'Fail',
};