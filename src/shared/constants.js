export const SEX_OPTIONS_KEYS = ['Male', 'Women'];
export const DIRECTIONS_OPTIONS_KEYS = ['Java', 'Frontend'];
export const ROLE_OPTIONS_KEYS = ['Admin', 'Mentor', 'Member'];
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
  active: 'Active',
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
    description: 'Description',
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
  track: 'tracks',
};

export const STATUS_KEYS = {
  active: 'Active',
  success: 'Success',
  fail: 'Fail',
};

export const LINKPATH_KEYS = {
  track: 'track',
  progress: 'progress',
  tasks: 'tasks',
};

export const MODALTITLE_KEYS = {
  createMember: 'Create member',
  createTask: 'Create task',
  createTrack: 'Create track',
};

export const USER_FIELDS_KEYS = [
  { name: 'name', title: 'Name:', type: 'text', required: true },
  { name: 'lastName', title: 'Last name:', type: 'text', required: false },
  { name: 'email', title: 'Email:', type: 'text', required: true },
  { name: 'direction', title: 'Direction:', type: 'select', options: DIRECTIONS_OPTIONS_KEYS, required: false },
  { name: 'sex', title: 'Sex:', type: 'select', options: SEX_OPTIONS_KEYS, required: true },
  { name: 'role', title: 'Role:', type: 'select', options: ROLE_OPTIONS_KEYS, required: true },
  { name: 'password', title: 'Password:', type: 'password', required: true },
  { name: 'confirmPassword', title: 'Confirm password:', type: 'password', required: true },
  { name: 'birthDate', title: 'Date of Birth:', type: 'date', required: true },
  { name: 'address', title: 'Address:', type: 'text', required: true },
  { name: 'phone', title: 'Mobile phone:', type: 'text', required: true },
  { name: 'skype', title: 'Skype:', type: 'text' },
  { name: 'startDate', title: 'Start date:', type: 'date', required: true },
  { name: 'education', title: 'Education:', type: 'text', required: true },
  { name: 'universityAverageAcore', title: 'University average score:', type: 'text', required: true },
  { name: 'mathScore', title: 'Math score:', type: 'text', required: true },
];

export const TASK_FIELDS_KEYS = [
  { name: 'name', title: 'Name:', type: 'text', required: true },
  { name: 'description', title: 'Description:', type: 'text', required: false },
  { name: 'startDate', title: 'Start date:', type: 'date', required: true },
  { name: 'deadlineDate', title: 'Deadline:', type: 'date', required: true },
];
export const TRACK_FIELDS_KEYS = [
  { name: 'name', title: 'Name:', type: 'select', required: true },
  { name: 'date', title: 'Date:', type: 'date', required: true },
  { name: 'node', title: 'Node:', type: 'text', required: true },
];
