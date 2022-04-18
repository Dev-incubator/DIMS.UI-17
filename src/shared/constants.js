import { getCurrentYear } from './helpers/getCurrentYear/getCurrentYear';

export const SEX_OPTIONS_KEYS = ['Male', 'Women'];
export const DIRECTIONS_OPTIONS_KEYS = ['Java', 'Frontend'];
export const ROLE_OPTIONS_KEYS = ['admin', 'mentor', 'member'];

export const TITLES_PAGES = {
  members: 'Members',
  allTasks: 'All Tasks',
  currentTasks: 'Current Tasks',
  progress: 'Progress',
  track: 'Task track',
  userTasks: 'Hi! There are your current tasks',
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
  ok: 'OK',
};

export const BUTTONS_TYPES = {
  typePrimary: 'primary',
  typeSecondary: 'secondary',
  typeEdit: 'warning',
  typeDelete: 'danger',
  typeSave: 'success',
};

export const TABLE_TITLES = {
  track: ['#', 'Task', 'Node', 'Date', 'Actions'],
  allTasks: ['#', 'Task name', 'Description', 'Start date', 'Deadline', 'Actions'],
  members: ['#', 'Full name', 'Direction', 'Education', 'Start', 'Age', 'Actions'],
  currentTasks: ['#', 'Task name', 'Start date', 'Deadline', 'Status', 'Actions'],
  progress: ['#', 'Task name', 'Task note', 'Date'],
  userTasks: ['#', 'Task name', 'Start date', 'Deadline', 'Status'],
};

export const USER_ROLES = {
  admin: 'admin',
  mentor: 'mentor',
  member: 'member',
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
  { name: 'firstName', title: 'Name:', type: 'text' },
  { name: 'lastName', title: 'Last name:', type: 'text' },
  { name: 'email', title: 'Email:', type: 'text' },
  { name: 'directionName', title: 'Direction:', type: 'select', options: DIRECTIONS_OPTIONS_KEYS },
  { name: 'sex', title: 'Sex:', type: 'select', options: SEX_OPTIONS_KEYS },
  { name: 'roles', title: 'Role:', type: 'select', options: ROLE_OPTIONS_KEYS },
  { name: 'password', title: 'Password:', type: 'password' },
  { name: 'repeatPassword', title: 'Confirm password:', type: 'password' },
  { name: 'birthDate', title: 'Date of Birth:', type: 'date' },
  { name: 'address', title: 'Address:', type: 'text' },
  { name: 'mobilePhone', title: 'Mobile phone:', type: 'text' },
  { name: 'skype', title: 'Skype:', type: 'text' },
  { name: 'startDate', title: 'Start date:', type: 'date' },
  { name: 'education', title: 'Education:', type: 'text' },
  { name: 'universityAverageScore', title: 'University average score:', type: 'text' },
  { name: 'mathScore', title: 'Math score:', type: 'text' },
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

export const FOOTER_KEYS = {
  creator: 'Evgeniy Moroz',
  years: getCurrentYear(),
};

export const LINKS_HEADER_MENU = [
  {
    className: 'navItem',
    activeClassName: 'selected',
    to: '/members',
    name: 'Members',
    access: 'admin',
  },
  {
    className: 'navItem',
    activeClassName: 'selected',
    to: '/tasks',
    name: 'Tasks',
    access: 'member',
  },
];

export const FORM_MEMBER_ERRORS = [
  { name: 'firstName', error: null },
  { name: 'lastName', error: null },
  { name: 'email', error: null },
  { name: 'password', error: null },
  { name: 'repeatPassword', error: null },
  { name: 'birthDate', error: null },
  { name: 'address', error: null },
  { name: 'mobilePhone', error: null },
  { name: 'startDate', error: null },
  { name: 'education', error: null },
  { name: 'universityAverageScore', error: null },
  { name: 'mathScore', error: null },
];

export const FORM_TASK_ERRORS = [
  { name: 'name', error: null },
  { name: 'description', error: null },
  { name: 'startDate', error: null },
  { name: 'deadlineDate', error: null },
  { name: 'checkbox', error: null },
];

export const FORM_TRACKS_ERRORS = [
  { name: 'date', error: null },
  { name: 'node', error: null },
];
