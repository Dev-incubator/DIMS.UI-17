export const SEX_KEYS = {
  man: 'Male',
  woman: 'Women',
};
export const DIRECTIONS_KEYS = {
  java: 'Java',
  frontend: 'Frontend',
};
export const TITLES_PAGES = {
  members: 'Members',
  allTasks: 'All Tasks',
  currentTasks: 'Current Tasks',
  progress: 'Progress',
  track: 'Task track',
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
  allTasks: {
    id: '#',
    name: 'Task name',
    direction: 'Direction',
    startDate: 'Start date',
    deadlineDate: 'Deadline',
    actions: 'Actions',
  },
  track: {
    id: '#',
    name: 'Task',
    node: 'Node',
    date: 'Date',
    actions: 'Actions',
  },
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
  admin: 'Admin',
  mentor: 'Mentor',
  member: 'Member',
};

export const PAGES_KEYS = {
  tasks: 'tasks',
  progress: 'progress',
  track: 'track',
};

export const STATUS_KEYS = {
  active: 'Active',
  success: 'Success',
  fail: 'Fail',
};

export const LINKPATH_KEYS = {
  track: 'track',
  progress: 'progress',
};

export const MODALTITLE_KEYS = {
  createMember: 'Create member',
};

export const USER_FIELDS_KEYS = [
  { name: 'name', title: 'Name:', type: 'text' },
  { name: 'lastName', title: 'Last name:', type: 'text' },
  { name: 'email', title: 'Email:', type: 'text' },
  { name: 'direction', title: 'Direction:', type: 'select', options: DIRECTIONS_KEYS },
  { name: 'sex', title: 'Sex:', type: 'select', options: SEX_KEYS },
  { name: 'role', title: 'Role:', type: 'select', options: USER_ROLES },
  { name: 'password', title: 'Password:', type: 'text' },
  { name: 'confirmPassword', title: 'Confirm password:', type: 'text' },
  { name: 'birthDate', title: 'Date of Birth:', type: 'date' },
  { name: 'address', title: 'Mobile phone:', type: 'text' },
  { name: 'skype', title: 'Skype:', type: 'text' },
  { name: 'startDate', title: 'Start date:', type: 'date' },
  { name: 'education', title: 'Education:', type: 'text' },
  { name: 'universityAverageAcore', title: 'University average score:', type: 'text' },
  { name: 'mathScore', title: 'Math score:', type: 'text' },
];
