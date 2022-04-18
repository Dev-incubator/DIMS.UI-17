export function getRoles(roles) {
  if (roles.find((item) => item === 'admin')) {
    return 'admin';
  }
  if (roles.find((item) => item === 'mentor')) {
    return 'mentor';
  }
  if (roles.find((item) => item === 'member')) {
    return 'mentor';
  }

  return roles;
}
